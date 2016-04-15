-- phpMyAdmin SQL Dump
-- version 4.4.15.5
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Апр 15 2016 г., 16:50
-- Версия сервера: 5.5.48
-- Версия PHP: 5.5.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `laravel`
--

-- --------------------------------------------------------

--
-- Структура таблицы `adverts`
--

CREATE TABLE IF NOT EXISTS `adverts` (
  `user_id` int(11) NOT NULL,
  `user_first_name` varchar(255) NOT NULL,
  `user_last_name` varchar(255) NOT NULL,
  `user_login` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `adverts`
--

INSERT INTO `adverts` (`user_id`, `user_first_name`, `user_last_name`, `user_login`, `user_password`) VALUES
(1, 'John', 'Doe', 'jdoe@gmail.com', '$2y$10$2QPybtZLN93.Ns8QtaB.q.rw3d95YNvXB6oG1rXS9F0mCxejjQS8K'),
(2, 'Erick', 'Doe', 'edoe@gmail.com', '$2y$10$2QPybtZLN93.Ns8QtaB.q.rw3d95YNvXB6oG1rXS9F0mCxejjQS8K'),
(3, 'Michel', 'Doe', 'mdoe@gmail.com', '$2y$10$2QPybtZLN93.Ns8QtaB.q.rw3d95YNvXB6oG1rXS9F0mCxejjQS8K');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `adverts`
--
ALTER TABLE `adverts`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `adverts`
--
ALTER TABLE `adverts`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
