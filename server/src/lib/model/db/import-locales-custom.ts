import { getMySQLInstance } from './mysql'

type Locale = {
  code: string
  name: string
  is_contributable: boolean
}

const LOCALES: Locale[] = [
  { code: 'nl', name: 'Nederlands', is_contributable: false },
  { code: 'act', name: 'Achterhoeks', is_contributable: true },

  { code: 'drt-NV', name: 'Drents: Noordenvelds', is_contributable: true },
  { code: 'drt-MD', name: 'Drents: Midden-Drents', is_contributable: true },
  { code: 'drt-ZO', name: 'Drents: Zuudoost-Zaand', is_contributable: true },
  { code: 'drt-ZW', name: 'Drents: Zuudwest-Zuud', is_contributable: true },

  { code: 'gos-HO', name: 'Gronings: Hogelandsters', is_contributable: true },
  { code: 'gos-VE', name: 'Gronings: Veenkoloniaals', is_contributable: true },
  { code: 'gos-WE', name: 'Gronings: Westerkwartiers', is_contributable: true },
  { code: 'gos-WO', name: 'Gronings: Westerwolds en Oldambsters', is_contributable: true },

  { code: 'sdz', name: 'Sallands', is_contributable: true },
  { code: 'stl', name: 'Stellingwerfs', is_contributable: true },
  { code: 'twd', name: 'Twents', is_contributable: true },
  { code: 'vel', name: 'Veluws', is_contributable: true },
]

const db = getMySQLInstance()

const fetchExistingLanguages = async () => {
  const [existinglanguages] = await db.query(`
        select
          t.locale_id as has_clips,
          l.id,
          l.name,
          l.target_sentence_count as target_sentence_count,
          count(1) as total_sentence_count,
          is_translated,
          is_contributable
        from locales l
        left join sentences s on s.locale_id = l.id
        left join (select c.locale_id from clips c group by c.locale_id) t on t.locale_id = s.locale_id
        group by l.id
      `)
  return existinglanguages
}

export async function importLocales() {
  console.log('Importing languages...')

  const existingLanguages = await fetchExistingLanguages()
  const allLanguages = existingLanguages.reduce((obj: any, language: any) => {
    obj[language.name] = {
      ...language,
      hasEnoughSentences:
        language.total_sentence_count >= language.target_sentence_count,
    }
    return obj
  }, {})

  await Promise.all(
    LOCALES.map(async lang => {
      if (allLanguages[lang.code]) {
        // this language exists in db, just update
        return await db.query(
          `
            UPDATE locales
            SET target_sentence_count = ?,
            native_name = ?,
            is_contributable = ?,
            is_translated = ?,
            text_direction = ?
            WHERE id = ?
            `,
          [
            750,
            lang.name,
            lang.is_contributable,
            true,
            'LTR',
            allLanguages[lang.code].id,
          ]
        )
      } else {
        // this is a new language, insert
        return await db.query(
          `INSERT IGNORE INTO locales(name, target_sentence_count, native_name, is_contributable, is_translated, text_direction) VALUES (?)`,
          [[lang.code, 0, lang.name, lang.is_contributable, true, 'LTR']]
        )
      }
    })
  )
  console.log('Saving accents to database')

  // Make sure each language has at minimum an "unspecified" accent
  await db.query(`
    INSERT IGNORE INTO accents (locale_id, accent_name, accent_token, user_submitted)
    SELECT id, "", "unspecified", 0 from locales`)

  console.log('Importing languages completed')
}
