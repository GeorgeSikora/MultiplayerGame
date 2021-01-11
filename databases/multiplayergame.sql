-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Pon 11. led 2021, 09:11
-- Verze serveru: 10.4.14-MariaDB
-- Verze PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `multiplayergame`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `errors`
--

CREATE TABLE `errors` (
  `id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `description` varchar(500) NOT NULL,
  `ip` varchar(50) NOT NULL,
  `dateCreated` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Vypisuji data pro tabulku `errors`
--

INSERT INTO `errors` (`id`, `type`, `description`, `ip`, `dateCreated`) VALUES
(198, 'login', 'nickname obsahuje nepovolené znaky', '::1', '2021-01-10 11:40:15'),
(208, 'login', 'heslo obsahuje nepovolené znaky', '::1', '2021-01-10 11:41:40'),
(209, 'login', 'heslo obsahuje nepovolené znaky', '::1', '2021-01-10 11:41:40'),
(210, 'login', 'heslo obsahuje nepovolené znaky', '::1', '2021-01-10 11:41:47'),
(211, 'login', 'heslo obsahuje nepovolené znaky', '::1', '2021-01-10 11:41:47'),
(212, 'login', 'heslo obsahuje nepovolené znaky', '::1', '2021-01-10 11:41:55'),
(213, 'login', 'nickname obsahuje nepovolené znaky', '::1', '2021-01-10 11:43:29'),
(214, 'login', 'heslo nemá určitou délku pro hash', '::1', '2021-01-10 11:44:00'),
(215, 'login', 'heslo nemá určitou délku pro hash', '::1', '2021-01-10 11:45:34');

-- --------------------------------------------------------

--
-- Struktura tabulky `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `clanId` int(11) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `connected` tinyint(1) NOT NULL DEFAULT 0,
  `dateLastConnect` datetime NOT NULL DEFAULT current_timestamp(),
  `dateCreated` datetime NOT NULL DEFAULT current_timestamp(),
  `ip` varchar(50) NOT NULL,
  `permissionLevel` int(11) NOT NULL DEFAULT 0,
  `token` text NOT NULL,
  `tokenUsed` tinyint(1) NOT NULL DEFAULT 0,
  `coins` int(11) NOT NULL,
  `posX` int(11) NOT NULL DEFAULT 0,
  `posY` int(11) NOT NULL DEFAULT 0,
  `health` int(11) NOT NULL,
  `level` int(11) NOT NULL DEFAULT 1,
  `xp` int(11) NOT NULL DEFAULT 0,
  `playedMatches` int(11) NOT NULL DEFAULT 0,
  `wins` int(11) NOT NULL DEFAULT 0,
  `kills` int(11) NOT NULL DEFAULT 0,
  `deaths` int(11) NOT NULL DEFAULT 0,
  `minutesPlayed` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Vypisuji data pro tabulku `players`
--

INSERT INTO `players` (`id`, `clanId`, `name`, `password`, `connected`, `dateLastConnect`, `dateCreated`, `ip`, `permissionLevel`, `token`, `tokenUsed`, `coins`, `posX`, `posY`, `health`, `level`, `xp`, `playedMatches`, `wins`, `kills`, `deaths`, `minutesPlayed`) VALUES
(1, NULL, 'Jurek', '24aa1b323cd7b2b8324a4ed27e5b01ce', 0, '2021-01-10 11:54:34', '2021-01-07 13:25:29', '::1', 0, '', 1, 1000, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1),
(11, NULL, 'user1', '24c9e15e52afc47c225b757e7bee1f9d', 0, '2021-01-09 22:30:13', '2021-01-07 16:58:16', '::1', 0, '', 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1),
(12, NULL, 'user2', '7e58d63b60197ceb55a1c487989a3720', 0, '2021-01-09 22:18:57', '2021-01-07 16:58:28', '::1', 0, '', 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0),
(13, NULL, 'user3', '92877af70a45fd6a2ed7fe81e1236b78', 0, '2021-01-09 22:18:57', '2021-01-07 16:58:43', '::1', 0, '', 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0),
(53, NULL, 'Snowyy', '628ca3a6dd6d20efa003571640b3632e', 0, '2021-01-09 22:18:57', '2021-01-07 13:08:58', '109.183.118.150', 0, '', 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0),
(55, NULL, 'str0d3x', '55fb15133702525d01541c71add80b15', 0, '2021-01-09 22:18:57', '2021-01-07 13:08:58', '', 0, '', 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0),
(59, NULL, 'L4N3S_SSK20', 'b88d728dd1f1c9bb298adf8252f99e1c', 0, '2021-01-09 22:18:57', '2021-01-07 14:44:58', '85.70.253.133', 0, '', 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0),
(95, NULL, 'Invalid', '7d735e6ce842477dff74ec10e0eb0702', 1, '2021-01-10 12:41:03', '2021-01-10 11:53:30', '8.20.127.65', 0, '', 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 4),
(96, NULL, 'Jurek2', '24aa1b323cd7b2b8324a4ed27e5b01ce', 0, '2021-01-10 12:38:09', '2021-01-10 11:54:50', '185.221.124.205', 0, '', 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 7);

-- --------------------------------------------------------

--
-- Struktura tabulky `statistics`
--

CREATE TABLE `statistics` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Vypisuji data pro tabulku `statistics`
--

INSERT INTO `statistics` (`id`, `name`, `count`) VALUES
(1, 'page_entry', 109);

--
-- Klíče pro exportované tabulky
--

--
-- Klíče pro tabulku `errors`
--
ALTER TABLE `errors`
  ADD PRIMARY KEY (`id`);

--
-- Klíče pro tabulku `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`);

--
-- Klíče pro tabulku `statistics`
--
ALTER TABLE `statistics`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `errors`
--
ALTER TABLE `errors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=216;

--
-- AUTO_INCREMENT pro tabulku `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT pro tabulku `statistics`
--
ALTER TABLE `statistics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
