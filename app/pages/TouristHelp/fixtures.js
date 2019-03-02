export const phonesList = [
    {
        icon: '/static/images/help/phone-emergency.png',
        title: 'Single emergency number',
        number: '112'
    },
    {
        icon: '/static/images/help/phone-fire.png',
        title: 'Fire service',
        number: '101'
    },
    {
        icon: '/static/images/help/phone-police.png',
        title: 'Police',
        number: '102'
    },
    {
        icon: '/static/images/help/phone-ambulance.png',
        title: 'Ambulance',
        number: '103'
    }
];

export const weatherList = [
    {
        title: 'Cold winter',
        description: 'It starts in November and lasts until April. Influence of Arctic air mass leads to strong (up to -50° C) frost.',
        icon: '/static/images/help/weather-icon-winter.png',
        image: '/static/images/help/weather-winter.png'
    },
    {
        title: 'Short spring',
        description: 'Spring lasts from mid-April to the end of may. Weather in the spring is unstable: a clear warm day can suddenly be replaced by a cold snap.',
        icon: '/static/images/help/weather-icon-spring.png',
        image: '/static/images/help/weather-spring.png'
    },
    {
        title: 'Hot summer',
        description: 'Dry hot summer begins in late may and lasts until mid-September, the temperature rises at times to + 35...+40 C°.',
        icon: '/static/images/help/weather-icon-summer.png',
        image: '/static/images/help/weather-summer.png'
    },
    {
        title: 'Warm autumn',
        description: 'Autumn, with even weather and night frosts, begins at the end of September and lasts until early November.',
        icon: '/static/images/help/weather-icon-autumn.png',
        image: '/static/images/help/weather-autumn.png'
    },
];

export const transportList = [
    {
        title: 'Air transport',
        description: 'Air transport is one of the main means of mass transportation of passengers in the world. There are 22 major airports in Kazakhstan, 14 of which serve international flights. Daily transportation of passengers, baggage, cargo and mail',
        icon: '/static/images/icons/icon-airplane.svg'
    },
    {
        title: 'Railway transport',
        description: 'Railway transport for the carriage of passengers and cargo is the main mode of transport in Kazakhstan. The Republic takes the 3rd place in the CIS after Russia and Ukraine by the operational length of Railways. The length of Railways in Kazakhstan exceeds 15 thousand km. 16 division points connect the railway system of Kazakhstan with the neighboring countries - 11 with Russia, 2 with Uzbekistan, 1 with Kyrgyzstan, 2 from China. Today is the transportation of passengers on 116 routes.',
        icon: '/static/images/icons/icon-railway.svg'
    },
    {
        title: 'Public transport',
        description: 'Public transport is designed to transport the population on a specific schedule and route. In Kazakhstan, public transport is well developed. In all cities buses run around the city and minibuses. You can also use a taxi. Almaty has a metro.',
        icon: '/static/images/icons/icon-bus-1.svg'
    },
    {
        title: 'Public velotransport ',
        description: 'In summer, bicycles are very popular. There are special points where you can rent a bike. Bicycles save time, as well as Cycling energizes and develops endurance.Public Cycling is available in the cities of Astana, Almaty, Shymkent.',
        icon: '/static/images/icons/icon-velo.svg'
    },
    {
        title: 'Taxi ',
        description: 'Taxis in Kazakhstan will be required in cases where you need to go around a lot of places in just one day, the rest is quite convenient public transport. It is advantageous to use a taxi in Kazakhstan for tourists traveling in a small group. Taxi service is also suitable for trips in the immediate surroundings of cities. A large number of cars with checkers on the roofs is always near airports, metro stations and bus stops. You can also find taxis near shopping centres and markets.',
        icon: '/static/images/icons/icon-taxi.svg'
    }
]

export const destinationsList = [
    {
        city: 'Алматы',
        destinations: [
            {
                city_from: 'Пекин (PEK)',
                duration: '4,35'
            },
            {
                city_from: 'Франкфурт (FRA)',
                duration: '7,25'
            },
            {
                city_from: 'Стамбул (IST)',
                duration: '6,3'
            },
            {
                city_from: 'Стамбул (SAW)',
                duration: '6'
            },
            {
                city_from: 'Москва (SVO)',
                duration: '4,5'
            },
            {
                city_from: 'Сеул (ICN)',
                duration: '5,4'
            },
            {
                city_from: 'Душанбе (DYU) ',
                duration: '1,55'
            },
            {
                city_from: 'Киев (KBP)',
                duration: '5,25'
            },
            {
                city_from: 'Минск (MSQ) ',
                duration: '5,1'
            },{
                city_from: 'Новосибирск (OVB)',
                duration: '2,3'
            },
            {
                city_from: 'Ташкент (TAS)',
                duration: '1,35'
            },
            {
                city_from: 'Баку (GYD)',
                duration: '3,5'
            },
            {
                city_from: 'Бишкек (FRU)',
                duration: '0,55'
            },
            {
                city_from: 'Санкт Петербург (LED)',
                duration: '5,25'
            },
            {
                city_from: 'Тбилиси (TBS)',
                duration: '4,2'
            },
            {
                city_from: 'Урумчи ‎(URC)‎',
                duration: '1,45'
            },
            {
                city_from: 'Куала-Лумпур ‎(KUL)‎',
                duration: '8,1'
            },
            {
                city_from: 'Дубай ‎(DXB)‎',
                duration: '5'
            },
            {
                city_from: 'Дели ‎(DEL)‎',
                duration: '3,5'
            },
            {
                city_from: 'Гонконг ‎(HKG)‎',
                duration: '6,05'
            },
            {
                city_from: 'Бангкок ‎(BKK)‎',
                duration: '6,45'
            },
            {
                city_from: 'Анталья ‎(AYT)‎',
                duration: '5,3'
            },
            {
                city_from: 'Ашхабад (ASB)',
                duration: '3'
            },
            {
                city_from: 'Шарджа (SHJ)',
                duration: '4,4'
            },
        ],
        map: '/static/images/help/map-almaty.png'
    },
    {
        city: 'Астана',
        destinations: [
            {
                city_from: 'Абу-Даби (AUH)',
                duration: '4.45'
            },
            {
                city_from: 'Пекин (PEK)',
                duration: '5,1'
            },
            {
                city_from: 'Франкфурт (FRA)',
                duration: '6,25'
            },
            {
                city_from: 'Стамбул (IST)',
                duration: '5,2'
            },
            {
                city_from: 'Москва (SVO)',
                duration: '3,5'
            },
            {
                city_from: 'Киев (KBP)',
                duration: '4,3'
            },
            {
                city_from: 'Минск (MSQ)',
                duration: '4,2'
            },
            {
                city_from: 'Ташкент (TAS)',
                duration: '2,05'
            },
            {
                city_from: 'Урумчи ‎(URC)‎',
                duration: '2,2'
            },
            {
                city_from: 'Тбилиси ‎(TBS)‎',
                duration: '3,35'
            },
            {
                city_from: 'Сеул ‎(ICN)‎',
                duration: '6,15'
            },
            {
                city_from: 'Санкт-Петербург ‎(LED)‎',
                duration: '4,2'
            },
            {
                city_from: 'Париж ‎(CDG)',
                duration: '7'
            },
            {
                city_from: 'Омск ‎(OMS)‎',
                duration: '1,1'
            },
            {
                city_from: 'Новосибирск ‎(OVB)‎',
                duration: '1,5'
            },
            {
                city_from: 'Лондон ‎(LHR)‎',
                duration: '7,15'
            },
            {
                city_from: 'Казань ‎(KZN)‎',
                duration: '2,4'
            },
            {
                city_from: 'Екатеринбург ‎(SVX)',
                duration: '1,5'
            },
            {
                city_from: 'Дубай ‎(DXB)',
                duration: '4,5'
            },
            {
                city_from: 'Дели ‎(DEL)‎',
                duration: '4,3'
            },
            {
                city_from: 'Варшава ‎(WAW)',
                duration: '5,25'
            },
            {
                city_from: 'Бишкек ‎(FRU)‎',
                duration: '1,5'
            },
            {
                city_from: 'Бангкок ‎(BKK)',
                duration: '7,3'
            },
            {
                city_from: 'Баку ‎(GYD)‎',
                duration: '3,2'
            },
            {
                city_from: 'Будапешт (BUD)',
                duration: '5,4'
            },
        ],
        map: '/static/images/help/map-astana.png'
    },
    {
        city: 'Шымкент',
        destinations: [
            {
                city_from: 'Москва (SVO)',
                duration: '4,2'
            },
            {
                city_from: 'Стамбул (IST)',
                duration: '5,3'
            },
            {
                city_from: 'Новосибирск ‎(OVB)‎',
                duration: '2,45'
            },
        ],
        map: '/static/images/help/map-shymkent.png'
    },
    {
        city: 'Актау',
        destinations: [
            {
                city_from: 'Махачкала (MCX)',
                duration: '0,45'
            },
            {
                city_from: 'Тбилиси, TBS',
                duration: '1,1'
            },
            {
                city_from: 'Баку (GYD)',
                duration: '0,5'
            },
            {
                city_from: 'Минеральные Воды (MRV)',
                duration: '1,2'
            },
            {
                city_from: 'Стамбул (IST)',
                duration: '3,2'
            },
            {
                city_from: 'Москва (SVO)',
                duration: '2,55'
            },
            {
                city_from: 'Москва (VKO)',
                duration: '2,2'
            },
        ],
        map: '/static/images/help/map-aktau.png'
    },
    {
        city: 'Уральск',
        destinations: [
            {
                city_from: 'Франкфурт ‎(FRA)‎',
                duration: '4,4'
            },
        ],
        map: '/static/images/help/map-oral.png'
    },
    // {
    //     city: 'Костанай',
    //     destinations: [
    //         {
    //             city_from: '',
    //             duration: ''
    //         },
    //     ],
    //     map: '/static/images/help/map-kostanai.png'
    // },
    {
        city: 'Атырау',
        destinations: [
            {
                city_from: 'Франкфурт ‎(FRA)‎',
                duration: '5,1'
            },
            {
                city_from: 'Стамбул ‎(IST)‎',
                duration: '3,2'
            },
            {
                city_from: 'Амстердам ‎(AMS)',
                duration: '5,25'
            },
        ],
        map: '/static/images/help/map-atyrau.png'
    },
];

export const webResourcesList = [
    {
        name: 'State',
        resources: [
            {
                title: 'Ministry of foreign Affairs of the Republic of Kazakhstan',
                src: 'mfa.kz',
                icon: '/static/images/help/web-state-1.png'
            },
            {
                title: 'Joint stock company «National company «Kazakh Tourism» ',
                src: 'qaztourism.kz',
                icon: '/static/images/help/web-state-2.png'
            },
            {
                title: 'Almaty CityPASS single tourist card',
                src: 'almaty.citypass.kz',
                icon: '/static/images/help/web-state-3.png'
            },
            {
                title: 'Astana CityPASS single tourist card',
                src: 'astana.citypass.kz',
                icon: '/static/images/help/web-state-4.png'
            },
            {
                title: 'Burabay CityPASS single tourist card',
                src: 'astana.citypass.kz/ru/burabay-citypass',
                icon: '/static/images/help/web-state-5.png'
            },
            {
                title: 'Astana Convention Bureau - organization for planning, development and promotion the tourism sector of the city of Astana',
                src: 'welcometoastana.kz',
                icon: '/static/images/help/web-state-6.png'
            },
            {
                title: 'Visit center Almaty-the headquarters of tourist information and the place where any trip to Almaty begins',
                src: 'visitalmaty.kz',
                icon: '/static/images/help/web-state-7.png'
            }
        ]
    },
    {
        name: 'Information',
        resources: [
            {
                title: 'Burabay CityPASS single tourist card',
                src: 'astana.citypass.kz/ru/burabay-citypass',
                icon: '/static/images/help/web-state-5.png'
            },
            {
                title: 'Astana Convention Bureau - organization for planning, development and promotion the tourism sector of the city of Astana',
                src: 'welcometoastana.kz',
                icon: '/static/images/help/web-state-6.png'
            },
            {
                title: 'Visit center Almaty-the headquarters of tourist information and the place where any trip to Almaty begins',
                src: 'visitalmaty.kz',
                icon: '/static/images/help/web-state-7.png'
            }
        ]
    },
    {
        name: 'Buy tickets',
        resources: [
            {
                title: 'Burabay CityPASS single tourist card',
                src: 'astana.citypass.kz/ru/burabay-citypass',
                icon: '/static/images/help/web-state-5.png'
            },
            {
                title: 'Astana Convention Bureau - organization for planning, development and promotion the tourism sector of the city of Astana',
                src: 'welcometoastana.kz',
                icon: '/static/images/help/web-state-6.png'
            },
            {
                title: 'Visit center Almaty-the headquarters of tourist information and the place where any trip to Almaty begins',
                src: 'visitalmaty.kz',
                icon: '/static/images/help/web-state-7.png'
            }
        ]
    }
];
