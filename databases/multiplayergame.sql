-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Ned 03. led 2021, 20:38
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
  `Id` int(11) NOT NULL,
  `Type` text NOT NULL,
  `Description` text NOT NULL,
  `Ip` text NOT NULL,
  `Time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Vypisuji data pro tabulku `errors`
--

INSERT INTO `errors` (`Id`, `Type`, `Description`, `Ip`, `Time`) VALUES
(26, 'registration', 'post nemá nickname', '185.221.124.205', '2021-01-03 14:47:36'),
(27, 'registration', 'post nemá potvrzený souhlas s pravidly', '185.221.124.205', '2021-01-03 18:54:44');

--
-- Klíče pro exportované tabulky
--

--
-- Klíče pro tabulku `errors`
--
ALTER TABLE `errors`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `errors`
--
ALTER TABLE `errors`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
