-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2026 at 01:48 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `odtms`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `age` int(10) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `location` varchar(50) NOT NULL,
  `blood_type` varchar(10) NOT NULL,
  `role` varchar(30) NOT NULL,
  `profile_image` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `first_name`, `last_name`, `age`, `phone_number`, `email`, `password`, `gender`, `location`, `blood_type`, `role`, `profile_image`, `created_at`, `ID`) VALUES
(3, 'Feleke', 'Merin', 56, '0909090909', 'feleke@gmail.com', '1324Feleke?', 'male', 'Addis Ababa', 'O+', 'super_admin', '', '2026-04-06 16:43:04', 0),
(5, 'Gulelat', 'G', 43, '0912345678', 'gulelat@gmail.com', '1234Gulelat', 'male', 'Addis Ababa', 'O+', 'admin', '', '2026-04-06 17:18:36', 1),
(1, 'amanuel', 'yayeh', 25, '0940829609', 'aman@gmail.com', '1234Aman?', 'male', 'Addis Ababa', 'O+', 'admin', '', '2026-04-04 14:01:33', 2);

-- --------------------------------------------------------

--
-- Table structure for table `donations`
--

CREATE TABLE `donations` (
  `donation_id` int(11) NOT NULL,
  `phone_numbers` varchar(50) DEFAULT NULL,
  `organ_id` int(11) DEFAULT NULL,
  `donation_date` datetime DEFAULT current_timestamp(),
  `status` varchar(50) DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donations`
--

INSERT INTO `donations` (`donation_id`, `phone_numbers`, `organ_id`, `donation_date`, `status`) VALUES
(15, '0912345678', 1, '2026-04-04 19:10:45', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `hospital`
--

CREATE TABLE `hospital` (
  `ID` int(11) NOT NULL,
  `hospital_name` varchar(100) NOT NULL,
  `hospital_code` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hospital`
--

INSERT INTO `hospital` (`ID`, `hospital_name`, `hospital_code`) VALUES
(1, 'Tikur Ambessa Specialized Hospital', 'TASH'),
(2, 'Eye Bank Of Ethiopia', 'EBOE');

-- --------------------------------------------------------

--
-- Table structure for table `organ`
--

CREATE TABLE `organ` (
  `organ_id` int(11) NOT NULL,
  `organ_name` varchar(50) DEFAULT NULL,
  `organ_date` datetime DEFAULT current_timestamp(),
  `amount` int(11) NOT NULL,
  `statuss` varchar(50) DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `organ`
--

INSERT INTO `organ` (`organ_id`, `organ_name`, `organ_date`, `amount`, `statuss`) VALUES
(1, 'Kidney', '2025-12-29 13:00:45', 0, 'Pending'),
(2, 'Liver', '2025-12-29 13:02:02', 0, 'Pending'),
(3, 'Eye', '2026-02-28 18:46:40', 2, 'Pending'),
(4, 'Heart ', '2026-03-15 09:06:13', 0, 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `recipents`
--

CREATE TABLE `recipents` (
  `wait_id` int(11) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `organ_id` int(11) DEFAULT NULL,
  `reg_date` date NOT NULL DEFAULT current_timestamp(),
  `status` varchar(50) DEFAULT 'Pending',
  `urgency_level` varchar(10) NOT NULL DEFAULT 'Low'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipents`
--

INSERT INTO `recipents` (`wait_id`, `phone_number`, `organ_id`, `reg_date`, `status`, `urgency_level`) VALUES
(33, '0989898989', 1, '2026-04-07', 'Pending', 'Urgent'),
(34, '0907070707', 1, '2026-04-16', 'Pending', 'Low');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(20) NOT NULL,
  `gender` varchar(30) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `blood_type` varchar(50) DEFAULT NULL,
  `fayda_no` bigint(20) DEFAULT NULL,
  `profile_image` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `age`, `role`, `location`, `password`, `phone_number`, `gender`, `email`, `blood_type`, `fayda_no`, `profile_image`, `created_at`) VALUES
(32, 'Bereket', 'Mekonnen ', 24, 'recipents', 'Addis Ababa', '1234Beki?', '0900000000', 'male', 'Beki@gmail.com', 'O+', NULL, '1775297547339.jpeg', '2026-03-31 18:56:39'),
(26, 'Kalab ', 'Eshetu ', 22, 'recipents', 'Addis Ababa', '1234Kalab?', '0906060606', 'male', 'Kalab@gmail.com', 'AB-', NULL, '', '2026-02-21 18:50:56'),
(31, 'Meba', 'Elias ', 23, 'recipents', 'Addis Ababa', '1234Meba?', '0907070707', 'male', 'Meba@gmail.com', 'O+', 1111666699998888, '', '2026-03-15 07:15:52'),
(28, 'Dani', 'Feleke', 22, 'admin', 'Tigray', '1234Dani?', '0912345566', 'Male', 'dani@gmail.com', 'O+', NULL, '', '2026-02-27 12:44:01'),
(4, 'Amanuel', 'Tesfaye ', 20, 'donor', 'Tigray', '1234Aman', '0912345678', 'male', 'AmanT@gmail.com', 'O+', 2222555533336666, '', '2026-01-25 17:41:57'),
(5, 'John ', 'Walker', 26, 'donor', 'Tigray', '1234John?', '0920000000', 'male', 'John@gmail.com', 'O-', NULL, '', '2026-02-02 19:27:30'),
(6, 'Rebecca ', 'Sol', 19, 'recipents', 'Tigray', '1234Rebecca?', '0930000000', 'female', 'Rebecca@gmail.com', 'O+', NULL, '', '2026-02-02 20:21:16'),
(7, 'Teddy', 'Afro', 41, 'donor', 'Addis Ababa', '1234Teddy?', '0940000000', 'male', 'Teddy@gmail.com', 'O+', NULL, '', '2026-02-03 15:23:26'),
(29, 'Amanuel', 'Yayeh ', 25, 'admin', 'Addis Ababa', '1234Aman?', '0940829609', 'male', 'Amanuel@gmail.com', 'B+', NULL, '', '2026-02-28 14:34:35'),
(8, 'Dagmawi', 'Abebe', 40, 'recipents', 'Addis Ababa', '1234Dagi?', '0947474747', 'male', 'dagi@gmail.com', 'B+', NULL, '', '2026-01-31 14:55:10'),
(9, 'Tamrat', 'Nigusse', 26, 'donor', 'Addis Ababa', '1234Tame?', '0950000000', 'male', 'Tame@gmail.com', 'O+', NULL, '', '2026-02-07 09:36:48'),
(10, 'Rophnan', 'Kasa', 24, 'recipents', 'Tigray', '1234Rophi?', '0960000000', 'male', 'Rophi@gmail.com', 'B+', NULL, '', '2026-02-07 09:41:31'),
(30, 'Samuel', 'Ambachew ', 22, 'donor', 'Addis Ababa', '1234Sam?', '0967676767', 'male', 'Samule@gmail.com', 'O+', NULL, '', '2026-03-15 06:55:49'),
(12, 'Dagm', 'Habtamu ', 23, 'recipents', 'Addis Ababa', '1234Dag', '0989898989', 'male', 'Dag@gmail.com', 'O+', NULL, '', '2026-01-01 20:49:34');

-- --------------------------------------------------------

--
-- Table structure for table `waiting_list`
--

CREATE TABLE `waiting_list` (
  `id` int(11) NOT NULL,
  `rec_phone_number` varchar(20) NOT NULL,
  `don_phone_number` varchar(20) NOT NULL,
  `organ_id` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` varchar(50) NOT NULL DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `waiting_list`
--

INSERT INTO `waiting_list` (`id`, `rec_phone_number`, `don_phone_number`, `organ_id`, `date`, `status`) VALUES
(62, '0989898989', '0912345678', 1, '2026-04-16 12:52:12', 'Completed'),
(63, '0907070707', '0912345678', 1, '2026-04-17 11:37:41', 'Pending');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`phone_number`),
  ADD UNIQUE KEY `admin_id` (`admin_id`),
  ADD KEY `fk_hospital_id` (`ID`);

--
-- Indexes for table `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY (`donation_id`),
  ADD KEY `phone_number` (`phone_numbers`),
  ADD KEY `organ_id` (`organ_id`);

--
-- Indexes for table `hospital`
--
ALTER TABLE `hospital`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `hospital_name` (`hospital_name`),
  ADD UNIQUE KEY `hospital_code` (`hospital_code`);

--
-- Indexes for table `organ`
--
ALTER TABLE `organ`
  ADD PRIMARY KEY (`organ_id`);

--
-- Indexes for table `recipents`
--
ALTER TABLE `recipents`
  ADD PRIMARY KEY (`wait_id`),
  ADD KEY `fk_waitinglist_userphone` (`phone_number`),
  ADD KEY `fk_waitinglist_organ` (`organ_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`phone_number`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `waiting_list`
--
ALTER TABLE `waiting_list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_rec_phone_num` (`rec_phone_number`),
  ADD KEY `fk_organ_id` (`organ_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `donations`
--
ALTER TABLE `donations`
  MODIFY `donation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `hospital`
--
ALTER TABLE `hospital`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `organ`
--
ALTER TABLE `organ`
  MODIFY `organ_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `recipents`
--
ALTER TABLE `recipents`
  MODIFY `wait_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `waiting_list`
--
ALTER TABLE `waiting_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `fk_hospital_id` FOREIGN KEY (`ID`) REFERENCES `hospital` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `donations`
--
ALTER TABLE `donations`
  ADD CONSTRAINT `donations_ibfk_1` FOREIGN KEY (`phone_numbers`) REFERENCES `users` (`phone_number`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `donations_ibfk_2` FOREIGN KEY (`organ_id`) REFERENCES `organ` (`organ_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `recipents`
--
ALTER TABLE `recipents`
  ADD CONSTRAINT `fk_waitinglist_organ` FOREIGN KEY (`organ_id`) REFERENCES `organ` (`organ_id`),
  ADD CONSTRAINT `fk_waitinglist_userphone` FOREIGN KEY (`phone_number`) REFERENCES `users` (`phone_number`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `waiting_list`
--
ALTER TABLE `waiting_list`
  ADD CONSTRAINT `fk_don_phone_num` FOREIGN KEY (`don_phone_number`) REFERENCES `users` (`phone_number`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_organ_id` FOREIGN KEY (`organ_id`) REFERENCES `organ` (`organ_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_rec_phone_num` FOREIGN KEY (`rec_phone_number`) REFERENCES `users` (`phone_number`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
