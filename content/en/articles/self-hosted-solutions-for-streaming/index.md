---
date: 04-11-2025
tags: ["self-hosted"]
description: "Overview of self-hosted solutions for streaming games and desktops over the network."
---

# Self-hosted solutions for streaming

## Why is this even necessary?

I am considering the following use cases:

1. Streaming games from PC to clients. The client can be anything, main requirement is 5GHz Wi-Fi or wired connection.
   <br>
   Instead of buying several devices capable of playing modern games, you can get clients without dedicated GPU (mini-pc, laptop), host PC with dedicated GPU
   and play games by connecting to it from clients.
2. Alternative to KVM switch. If you have several PCs (Gaming / Work / Personal / Server with Windows), you can connect to them with minimal input lag.

Over time, I have tested many solutions:

1. [Sunshine](https://github.com/LizardByte/Sunshine)
2. [Apollo](https://github.com/ClassicOldSong/Apollo)
3. [Duo](https://github.com/DuoStream/Duo)
4. [Steam Link](https://store.steampowered.com/remoteplay)
5. [Magic Mirror](https://github.com/colinmarc/magic-mirror)

## Steam Link

::player{:sources='[{ "src": "/media/articles/self-hosted-solutions-for-streaming/Steam-Link.mp4", "type": "video/mp4" }]'}
::

Main purpose of the Steam Link is game streaming, but you can stream anything you add into your Steam library, including games from other stores or
even other software.
<br>

**Advantages:**

1. Seamless integration with Steam Deck and devices running Steam clients - just click and play.
2. Conveniently configurable additional keys.
3. Controls the start and shutdown of game.
   <br>

**Disadvantages:**

1. Unstable stream.
2. No virtual screens (games will run at the resolution and frame rate of the host PC monitor).
   <br>

Overall, I would use Steam Link if it weren't for the artifacts and lag, but I haven't been able to find a solution to these problems.

**Platforms:**

- Host: macOS, Linux, Windows
- Clients: any

## Sunshine and its forks

::youtube-embed{video-id="tK6qzedsJTY"}
::
Sunshine is continuation of deprecated NVIDIA Gamestream Protocol, but without vendor lock to NVIDIA Graphic Cards and with open source code.
<br>
Can be used for games and for remote access to PC.

**Games I have completed using Sunshine and Moonlight**

1. RDR2 on Nintendo Switch.
2. The Legend of Zelda: Breath of the Wild on Legion Go.
3. Doom Eternal on Steam Deck.

In addition to games, I used it to remotely use Windows-only applications.

## Sunshine

**Advantages:**

1. Stream stability.
2. Availability of a client application for almost all compatible platforms.

**Disadvantages:**

1. No virtual screens (games will run at the resolution and frame rate of the host PC monitor).

**Platforms:**

- Host: macOS, Linux, Windows
- Clients: any

## Apollo

Sunshine fork aimed to provide out-of-box support for Virtual Screens using SudoDVA.

**Advantages:**

1. Automatic creation and removing virtual screens.
2. Permissions system for clients.
3. Clipboard sync between host and client.

**Disadvantages:**

1. Windows-only software, because there is no stable solution for virtual screens management between all distros.

**Platforms:**

- Host: Windows
- Clients: any

## Duo

Sunshine fork that allows to use one Host PC by multiple clients in parallel.

**Advantages:**

1. Multi-clients support.
2. Sandbox mode.

**Disadvantages:**

1. If you want all features you need to pay 10$.
2. Closed source code.
3. There is no precise information about how it works and how safe it is..
4. There is no support for other systems, and most likely there never will be..

I couldn’t find any working alternatives to this app, so I think paying $10 is worth it - or you can try to bypass this limitation.
There are quite a few use cases - you can fully use your PC while someone else is playing under a different user account,
or even play on the same PC simultaneously with several people.
<br>

I used Duo for several months and encountered almost no issues.
The only reason I switched to another solution was my desire to simplify my setup, as I didn’t fully understand how Duo worked and wasn’t sure
if I might run into problems with it in the future.

**Platforms:**

- Host: Windows
- Clients: any

## Magic Mirror

![Magic-Mirror](/media/articles/self-hosted-solutions-for-streaming/Magic-Mirror.jpg)

Experimental project exclusive to Linux with Wayland. It can stream multiple applications in the background without blocking access to the PC.
Primarily designed for game streaming, it works quite similarly to Steam Link - launches applications and manages their state
but cannot stream the entire system.

**Advantages:**

1. Multi-clients support.
2. Linux support.

**Disadvantages:**

1. Unstable stream.
2. Have clients only for macOS and Linux.

**Platforms:**

- Host: Linux with Wayland
- Clients: macOS with GUI or Linux from terminal

## What I use myself

I personally chose Apollo because it works simply and reliably. As for alternatives, I suggest considering the following:

1. **Sunshine** - if you prefer using Linux on your PC for gaming. You can explore possible virtual display solutions and implement them yourself through scripts.
2. **Duo** - if you want to use your PC on multiple clients simultaneously or continue using it while someone else is playing.

## Technical details

Each client requires a different amount of time to decode the stream, which affects input lag. The community has created a table listing clients and their decoding performance:
[SoC-Benchmark](https://docs.google.com/spreadsheets/d/1WSyOIq9Mn7uTd94PC_LXcFlUi9ceZHhRgk-Yld9rLKc/edit?gid=0#gid=0).
If the link is currently outdated, the table can be found by searching for "Moonlight decoding performance excel".

If you are using a Steam Deck, you may experience unstable streaming due to the odd behavior of the Wi-Fi module. A solution can be found in this
[Github Issue](https://github.com/ValveSoftware/SteamOS/issues/1445).
