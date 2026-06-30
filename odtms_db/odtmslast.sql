-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 24, 2026 at 09:21 AM
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
  `status` varchar(50) DEFAULT 'Pending',
  `donor_doc` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donations`
--

INSERT INTO `donations` (`donation_id`, `phone_numbers`, `organ_id`, `donation_date`, `status`, `donor_doc`) VALUES
(54, '0967676767', 3, '2026-06-22 11:20:04', 'Completed', '1782136349677.jpeg'),
(55, '0910101010', 3, '2026-06-22 16:30:55', 'Rejected', '1782141205802.jpeg'),
(57, '0907265137', 3, '2026-06-24 09:50:12', 'Approved', '1782283812197.jpeg');

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
  `statuss` varchar(50) DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `organ`
--

INSERT INTO `organ` (`organ_id`, `organ_name`, `organ_date`, `statuss`) VALUES
(1, 'Kidney', '2025-12-29 13:00:45', 'Pending'),
(2, 'Liver', '2025-12-29 13:02:02', 'Pending'),
(3, 'Eye', '2026-02-28 18:46:40', 'Pending'),
(4, 'Heart ', '2026-03-15 09:06:13', 'Pending');

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
  `urgency_level` varchar(10) NOT NULL DEFAULT 'Low',
  `recipents_doc` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipents`
--

INSERT INTO `recipents` (`wait_id`, `phone_number`, `organ_id`, `reg_date`, `status`, `urgency_level`, `recipents_doc`) VALUES
(42, '0907070707', 3, '2026-06-22', 'Completed', 'Low', '1782134030461.jpeg'),
(44, '0947474747', 3, '2026-06-22', 'Approved', 'Low', '1782135921526.jpeg'),
(45, '0940829609', 3, '2026-06-24', 'Approved', 'Low', '1782284674156.jpeg');

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
(87, 'Mebatsion ', 'Elias ', 25, 'recipents', 'Addis Ababa', '$2b$10$rhPtUcPofOOqBxuoxYcGgefoVGfp0eUqEBvjHgTwAT5hs.QN82eky', '0907070707', 'male', 'Meba@gmail.com', 'B+', 6660666699991234, '', '2026-06-22 08:33:07'),
(92, 'Amanuel', 'Yayeh', 22, 'donor', 'Addis Ababa', '$2b$10$8YZKoYlzHhlJkScReMjNz.vbwObWByPn49w5CtDjPpG/3P9AVFb..', '0907265137', 'male', 'Abc@gmail.com', 'B+', 1234567891234567, '', '2026-06-24 06:47:16'),
(89, 'Bamlak ', 'Tesfaye ', 22, 'donor', 'Addis Ababa', '$2b$10$fC4ANkzSQvWAc/LC9GV9f.wZMY9x1AmAegGVC357E9Z8jScoY.EKm', '0910101010', 'male', 'Bamlak@gmail.com', 'B+', 6565656565656565, '', '2026-06-22 13:24:36'),
(93, 'Samuel', 'Ambachew', 23, 'recipents', 'Addis Ababa', '$2b$10$yCQt/IM1b6It8.Qlj3ohFeT/EfFqDvhPjIepIf95y0Mzoh7O9Im1W', '0940829609', 'male', 'Samuel1@gmail.com', 'B+', 5656566556666655, '', '2026-06-24 07:02:37'),
(90, 'Dagm', 'Habtamu', 23, 'recipents', 'Addis Ababa', '$2b$10$4gcL9fmh2UwcTcLFkGFyH.KkpGIaFTUKjB00i6Cr.WUDsIm8SCpmO', '0947474747', 'male', 'Dagm@gmail.com', 'B+', 1234567890002225, '', '2026-06-22 13:25:27'),
(86, 'Sami', 'Ambachew ', 22, 'donor', 'Addis Ababa', '$2b$10$jx.fBjDAeZnzu6q8O3wozu9Z4R0f7s/92lDc1yRqcIvUOfy8ymCJG', '0967676767', 'male', 'Sami@gmail.com', 'B+', 6666999988880000, '', '2026-06-22 08:19:04');

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
(5, '0907070707', '0967676767', 3, '2026-06-22 16:14:09', 'Completed'),
(6, '0947474747', '0910101010', 3, '2026-06-22 18:11:48', 'Rejected'),
(8, '0940829609', '0907265137', 3, '2026-06-24 10:06:26', 'Approved');

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
  ADD KEY `fk_don_phone_num` (`don_phone_number`),
  ADD KEY `fk_organ_id` (`organ_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `donations`
--
ALTER TABLE `donations`
  MODIFY `donation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

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
  MODIFY `wait_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT for table `waiting_list`
--
ALTER TABLE `waiting_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
