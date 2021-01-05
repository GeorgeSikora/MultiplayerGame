-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Úte 05. led 2021, 12:42
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
  `type` text NOT NULL,
  `description` text NOT NULL,
  `ip` text NOT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Vypisuji data pro tabulku `errors`
--

INSERT INTO `errors` (`id`, `type`, `description`, `ip`, `time`) VALUES
(26, 'registration', 'post nemá nickname', '185.221.124.205', '2021-01-03 14:47:36'),
(27, 'registration', 'post nemá potvrzený souhlas s pravidly', '185.221.124.205', '2021-01-03 18:54:44'),
(28, 'registration', 'post nemá nickname', '::1', '2021-01-04 19:20:27');

-- --------------------------------------------------------

--
-- Struktura tabulky `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `clanId` int(11) DEFAULT NULL,
  `name` tinytext DEFAULT NULL,
  `password` tinytext DEFAULT NULL,
  `permissionLevel` int(11) NOT NULL DEFAULT 0,
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

INSERT INTO `players` (`id`, `clanId`, `name`, `password`, `permissionLevel`, `coins`, `posX`, `posY`, `health`, `level`, `xp`, `playedMatches`, `wins`, `kills`, `deaths`, `minutesPlayed`) VALUES
(1, NULL, 'Jurkos', '0145d27b4e419b49063c2d9cfbf06177', 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0),
(2, NULL, 'ASDAASDASD', 'e93ccf5ffc90eefcc0bdb81f87d25d1a', 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0),
(3, NULL, 'sdfsdf', 'af70c8d674634651ace0a8812b6af762', 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0);

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
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `errors`
--
ALTER TABLE `errors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT pro tabulku `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
