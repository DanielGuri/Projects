-- phpMyAdmin SQL Dump
-- version 6.0.0-dev+20240221.61cf618233
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 05, 2024 at 02:24 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations`
--

-- --------------------------------------------------------

--
-- Table structure for table `follow`
--

CREATE TABLE `follow` (
  `user_id` int(11) NOT NULL,
  `vacations_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `follow`
--

INSERT INTO `follow` (`user_id`, `vacations_id`) VALUES
(2, 1),
(2, 2),
(2, 5),
(2, 9),
(3, 1),
(3, 6),
(3, 7),
(3, 9),
(3, 10),
(4, 4),
(4, 7),
(4, 11),
(5, 2),
(5, 3),
(5, 8),
(5, 9),
(5, 12);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `famliyName` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `famliyName`, `username`, `password`, `role`) VALUES
(2, 'Daniel', 'Gurevich', 'daniel@gmail.com', '123456', 'admin'),
(3, 'Dani', 'Gur', 'dani@gmail.com', '123456', 'user'),
(4, 'Vadim', 'Gurevich', 'vadim@gmail.com', '123456', 'admin'),
(5, 'Lucy', 'Gur', 'lucy@gmail.com', '123456', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `id` int(11) NOT NULL,
  `descriptions` text NOT NULL,
  `country` varchar(255) NOT NULL,
  `cityName` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `dateFrom` date NOT NULL,
  `dateUntil` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`id`, `descriptions`, `country`, `cityName`, `price`, `img`, `dateFrom`, `dateUntil`) VALUES
(1, 'Beach vacation in Hawaii', 'USA', 'Honolulu', 1500.00, 'https://www.nationsonline.org/gallery/USA/Waikiki-Honolulu-Panorama.jpg', '2024-06-01', '2024-06-14'),
(2, 'Ski trip to the Alps', 'Switzerland', 'Zermatt', 2000.00, 'https://www.travelandleisure.com/thmb/ISDM_sDW3_0NSMJTZ3jgXjpRgsk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/zermatt-switzerland-aerial_SKITOWN0123-0df880426acd494c9d8791be79b07494.jpg', '2024-12-20', '2024-12-27'),
(3, 'City tour in Paris', 'France', 'Paris', 1200.00, 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/03/1c/9c.jpg', '2024-07-10', '2024-07-17'),
(4, 'Safari adventure in Kenya', 'Kenya', 'Nairobi', 2500.00, 'https://www.andbeyond.com/wp-content/uploads/sites/5/giraffe-and-sky-line-nairobi.jpg', '2024-08-05', '2024-08-15'),
(5, 'Historical tour in Rome', 'Italy', 'Rome', 1300.00, 'https://i.natgeofe.com/k/a6c9f195-de20-445d-9d36-745ef56042c5/OG_Colosseum_Ancient-Rome_KIDS_1122_3x2.jpg', '2024-09-10', '2024-09-17'),
(6, 'Relaxing trip in Bali', 'Indonesia', 'Bali', 1600.00, 'https://images.ctfassets.net/wv75stsetqy3/1VZbX4F4aIZI7hTBAQV3RF/2e84ece9888233996d125c27e1adfded/Sanur.jpg?q=60&fit=fill&fm=webp', '2024-11-01', '2024-11-10'),
(7, 'Adventure trip in New Zealand', 'New Zealand', 'Queenstown', 3000.00, 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Queenstown_1_%288168013172%29.jpg', '2024-02-15', '2024-02-25'),
(8, 'Cultural tour in Kyoto', 'Japan', 'Kyoto', 1400.00, 'https://blog.goway.com/globetrotting/wp-content/uploads/2018/05/Kiyomizu-dera-Temple-and-cherry-blossom-season-Sakura-spring-time-in-Kyoto-Japan-_1017748333.jpg', '2024-04-05', '2024-04-12'),
(9, 'Luxury stay in Dubai', 'UAE', 'Dubai', 3500.00, 'https://media.cntraveler.com/photos/646fac649b31895c2ec85c37/4:3/w_1600%2Ch_1200%2Cc_limit/Emirates%2520Offering%2520Free%2520Hotel%2520Stays%2520This%2520Summer%2520to%2520Passengers%2520Flying%2520to%2520Dubai_emma-harrisova-UDsO83Ts6tQ-unsplash.jpg', '2024-03-20', '2024-03-30'),
(10, 'Nature trip in Banff', 'Canada', 'Banff', 1700.00, 'https://banfflakelouise.bynder.com/m/e93e9494c8a4259/2000x1080_jpg-2021_LakeLouise_Hiking_ROAMCreative-7.jpg', '2024-05-15', '2024-05-25'),
(11, 'Beach and city tour in Barcelona', 'Spain', 'Barcelona', 1800.00, 'https://a.loveholidays.com/media-library/~production/c76a0c20fd81d7dafd7d402233ac236548d4c2fc-5722x2098.jpg?auto=avif%2Cwebp&quality=45&dpr=2&optimize=high&fit=crop&width=2000', '2024-06-20', '2024-06-30'),
(12, 'Exploration in Reykjavik', 'Iceland', 'Reykjavik', 2200.00, 'https://www.telegraph.co.uk/content/dam/Travel/Destinations/Europe/Iceland/Reykjavik/reykjavik-guide-lead-image-48-hours.jpg', '2024-07-01', '2024-07-10'),
(13, 'City in Colombia', 'Colombia', 'Medellin', 950.00, 'https://media.nomadicmatt.com/2024/medellinthings.jpg', '2024-06-27', '2024-06-29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `follow`
--
ALTER TABLE `follow`
  ADD PRIMARY KEY (`user_id`,`vacations_id`),
  ADD KEY `vacations_id` (`vacations_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `follow`
--
ALTER TABLE `follow`
  ADD CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`vacations_id`) REFERENCES `vacations` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
