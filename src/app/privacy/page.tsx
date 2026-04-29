import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности',
  robots: {
    index: false,
    follow: false,
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-dark-bg py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extralight text-white mb-12 text-center">
          Политика конфиденциальности
        </h1>
        
        <div className="space-y-8 text-white/70 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-light text-white mb-4">1. Общие положения</h2>
            <p>
              Настоящая Политика конфиденциальности определяет порядок обработки и защиты 
              персональных данных пользователей сайта solhome.ru (далее — «Сайт»), 
              принадлежащего компании Sol Home (далее — «Компания»).
            </p>
            <div className="mt-3 p-4 bg-white/5 rounded-lg">
              <p className="text-white/80">ИП Соломатин Олег Валерьевич</p>
              <p>ИНН 250551557109</p>
              <p>ОГРНИП 326253600044160</p>
            </div>
            <p className="mt-3">
              Используя Сайт и предоставляя свои персональные данные, вы соглашаетесь 
              с условиями настоящей Политики конфиденциальности.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light text-white mb-4">2. Какие данные мы собираем</h2>
            <p>Мы можем собирать следующие персональные данные:</p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li>Имя и фамилия</li>
              <li>Номер телефона</li>
              <li>Адрес электронной почты</li>
              <li>Информация о вашем объекте (площадь квартиры, тип ремонта)</li>
            </ul>
            <p className="mt-3">
              Данные собираются через формы обратной связи, калькулятор стоимости ремонта 
              и другие интерактивные элементы Сайта.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light text-white mb-4">3. Цели обработки данных</h2>
            <p>Мы используем ваши персональные данные для:</p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li>Связи с вами по вопросам ремонта</li>
              <li>Расчёта предварительной стоимости работ</li>
              <li>Подготовки коммерческого предложения</li>
              <li>Информирования об акциях и специальных предложениях (с вашего согласия)</li>
              <li>Улучшения качества наших услуг</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-light text-white mb-4">4. Cookies и аналитика</h2>
            <p>
              Сайт использует файлы cookies для улучшения пользовательского опыта 
              и сбора статистики посещений. Cookies — это небольшие текстовые файлы, 
              сохраняемые на вашем устройстве.
            </p>
            <p className="mt-3">
              Мы можем использовать сервисы веб-аналитики (такие как Яндекс.Метрика) 
              для анализа посещаемости Сайта. Эти сервисы также могут использовать cookies.
            </p>
            <p className="mt-3">
              Вы можете отключить cookies в настройках вашего браузера, однако это может 
              повлиять на функциональность Сайта.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light text-white mb-4">5. Защита данных</h2>
            <p>
              Мы принимаем все необходимые меры для защиты ваших персональных данных 
              от несанкционированного доступа, изменения, раскрытия или уничтожения.
            </p>
            <p className="mt-3">
              Персональные данные хранятся на защищённых серверах и доступны только 
              уполномоченным сотрудникам Компании.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light text-white mb-4">6. Ваши права</h2>
            <p>Вы имеете право:</p>
            <ul className="list-disc list-inside mt-3 space-y-2">
              <li>Запросить информацию о хранящихся персональных данных</li>
              <li>Потребовать исправления неточных данных</li>
              <li>Потребовать удаления ваших персональных данных</li>
              <li>Отозвать согласие на обработку персональных данных</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-light text-white mb-4">7. Передача данных третьим лицам</h2>
            <p>
              Мы не передаём ваши персональные данные третьим лицам без вашего согласия, 
              за исключением случаев, предусмотренных законодательством Российской Федерации.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light text-white mb-4">8. Изменения политики</h2>
            <p>
              Компания оставляет за собой право вносить изменения в настоящую Политику 
              конфиденциальности. Актуальная версия всегда доступна на данной странице.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-light text-white mb-4">9. Контакты</h2>
            <p>
              По вопросам, связанным с обработкой персональных данных, вы можете 
              связаться с нами:
            </p>
            <p className="mt-3">
              Email:{' '}
              <a href="mailto:info.solhome@yandex.ru" className="text-white hover:underline">
                info.solhome@yandex.ru
              </a>
            </p>
            <p className="mt-2">
              Телефон:{' '}
              <a href="tel:+79019018443" className="text-white hover:underline">
                +7 (901) 901-84-43
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
