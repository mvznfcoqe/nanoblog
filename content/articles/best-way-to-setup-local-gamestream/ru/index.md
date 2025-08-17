---
date: 12-01-2025
tags: ["selfhosted", "games"]
---

# Сетап для локального стриминга игр на Windows

С появлением handheld консолей на Android, Windows и SteamOS возникает желание поиграть на них в игры с ПК.
Самым простым решением будет использовать Steam Link, но из-за постоянных отвалов и фризов стало ясно что решение не самое оптимальное.

## Какие есть альтернативы?

Самое популярное - связка клиентского приложения Moonlight и сервера Sunshine.
Довольно удобное решение, так как нет ограничений на железо ПК, задержка для соло игр незаметна, а подключение (зачастую) стабильно.

## Личный опыт

В связке Moonlight и Sunshine я прошел RDR2 на Nintendo Switch (и да, для него тоже есть клиент),
The Legend of Zelda: Breath of the Wild на Legion Go и Doom Eternal на Steam Deck.

Самый печальный опыт, ожидаемо, был на Nintendo Switch, так как он имеет довольно слабый Wi-FI модуль и Moonlight не имеет доступа к GPU.

## Чего не хватает?

То, чего реально не хватало - автоматическое создание виртуальных экранов, и подключение к ним.

К примеру, Nintendo Switch и Steam Deck имеют нестандартное для экранов ПК разрешение (1280x720 и 1280×800 соответственно),
а Steam Deck Oled вообще имеет возможность выводить HDR картинку.

Одним из решений был [IddSampleDriver](https://github.com/roshkins/IddSampleDriver) и скрипты которые триггерятся на подключение/отключение клиента к серверу.
По моему опыту, это работает нестабильно, иногда после отключения девайса виртуальный монитор остается, монитор ПК не включается обратно.

Самой лучшей альтернативой для меня стал форк Sunshine - [Apollo](https://github.com/ClassicOldSong/Apollo).

## Apollo

Сервер аналогичен Sunshine, за исключением некоторых фич:

1. Встроенная поддержка виртуальных экранов с поддержкой HDR
2. Система разрешений для клиентов
3. Синхронизация буфера обмена между клиентом и сервером (Работает только в андроид клиенте [Artemis](https://github.com/ClassicOldSong/moonlight-android))

Apollo при подключении девайса создает виртуальный экран, со значениями высоты\ширины\фреймрейта клиента и поддержкой HDR при наличии таковой на клиенте,
что позволяет растягивать контент под нестандартные экраны (к примеру, если подключаться с клиента с разрешением экрана 16:10).

Реализация виртуальных экранов работает намного лучше, чем отдельный [IddSampleDriver](https://github.com/roshkins/IddSampleDriver) и скрипты.

## Ограничения по железу

Связка Sunshine + Moonlight требует 5Ghz Wi-Fi и стабильное подключение, сервер должен быть подключен к сети по проводу.

## Проверенный мною сетап

Сейчас я использую Apollo на ПК с Windows 11, Ryzen 7500F и RX7700XT, такой конфигурации достаточно для комфортной игры и стриминга большинства игр.

Как клиенты я использовал все свои девайсы - Android телефон, Oculus Quest 3, Macbook, Steam Deck, Nintendo Switch Oled. Если у устройства есть поддержка 5Ghz Wi-Fi - можно пробовать его в роли клиента.

Специально для стриминга я покупал роутер Xiaomi AX3000T, который прошил на OpenWRT.

Никаких дополнительных конфигураций Apollo не требовал, все работает из коробки.

![Moonlight on Meta Quest](/media/articles/best-way-to-setup-local-gamestream/quest-moonlight.jpg)

![Moonlight on Macbook](/media/articles/best-way-to-setup-local-gamestream/macbook-moonlight.jpg)

## Что еще можно?

К Apollo можно подключаться извне локальной сети, выполнив [инструкцию из Wiki](https://github.com/moonlight-stream/moonlight-docs/wiki/Setup-Guide#streaming-over-the-internet) , подключать девайс как дополнительный монитор к ПК (например, iPad).

## Как установить?

Установка подробно описана в [документации Sunshine](https://docs.lizardbyte.dev/projects/sunshine/latest/md_docs_2getting__started.html)

## Ссылки

Сервер:

- Apollo: https://github.com/ClassicOldSong/Apollo
- Sunshine: https://github.com/LizardByte/Sunshine

  Клиент:

- Приоритетный клиент для Андроид девайсов с дополнительными фичами: https://github.com/ClassicOldSong/moonlight-android
- IOS: https://apps.apple.com/ru/app/moonlight-game-streaming/id1000551566
- Остальные клиенты: https://github.com/moonlight-stream
