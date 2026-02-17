
CREATE DATABASE IF NOT EXISTS `odtms` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `odtms`;


CREATE TABLE `donations` (
  `donation_id` int(11) NOT NULL,
  `phone_numbers` varchar(50) DEFAULT NULL,
  `organ_id` int(11) DEFAULT NULL,
  `donation_date` datetime DEFAULT current_timestamp(),
  `status` varchar(50) DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `donations` (`donation_id`, `phone_numbers`, `organ_id`, `donation_date`, `status`) VALUES
(3, '0967676767', 2, '2025-12-29 17:20:02', 'Pending'),
(4, '0910101010', 2, '2026-01-02 10:14:53', 'Pending'),
(5, '0912345678', 1, '2026-01-25 20:44:36', 'Pending'),
(7, '0920000000', 2, '2026-02-02 22:28:52', 'Pending'),
(10, '0910000000', 2, '2026-02-04 20:15:15', 'Pending'),
(11, '0940829609', 1, '2026-02-17 18:18:17', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `organ`
--

CREATE TABLE `organ` (
  `organ_id` int(11) NOT NULL,
  `organ_name` varchar(50) DEFAULT NULL,
  `organ_date` datetime DEFAULT current_timestamp(),
  `statuss` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `organ`
--

INSERT INTO `organ` (`organ_id`, `organ_name`, `organ_date`, `statuss`) VALUES
(1, 'Kidney', '2025-12-29 13:00:45', 'pending'),
(2, 'Liver', '2025-12-29 13:02:02', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `recipents_waitinglist`
--

CREATE TABLE `recipents_waitinglist` (
  `wait_id` int(11) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `organ_id` int(11) DEFAULT NULL,
  `reg_date` date NOT NULL DEFAULT current_timestamp(),
  `status` varchar(50) DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipents_waitinglist`
--

INSERT INTO `recipents_waitinglist` (`wait_id`, `phone_number`, `organ_id`, `reg_date`, `status`) VALUES
(10, '0960000000', 2, '2026-02-07', 'Pending'),
(12, '0900000000', 1, '2026-02-07', 'Pending'),
(13, '0989898989', 2, '2026-02-07', 'Pending'),
(14, '0947474747', 1, '2026-02-08', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `rec_request`
--

CREATE TABLE `rec_request` (
  `id` int(11) NOT NULL,
  `rec_phone_number` varchar(20) NOT NULL,
  `don_phone_number` varchar(20) NOT NULL,
  `organ_id` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` varchar(50) NOT NULL DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rec_request`
--

INSERT INTO `rec_request` (`id`, `rec_phone_number`, `don_phone_number`, `organ_id`, `date`, `status`) VALUES
(37, '0989898989', '0967676767', 2, '2026-02-17 18:24:43', 'Pending'),
(38, '0989898989', '0910101010', 2, '2026-02-17 18:30:05', 'Pending');

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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `age`, `role`, `location`, `password`, `phone_number`, `gender`, `email`, `blood_type`, `created_at`) VALUES
(1, 'Bereket ', 'Mekonnen ', 22, 'recipents', 'Addis Ababa', '1234Beki?', '0900000000', 'male', 'Beki@gmail.com', 'B+', '2026-02-02 14:52:25'),
(2, 'James', 'Charles ', 33, 'donor', 'Addis Ababa', '1234James?', '0910000000', 'male', 'James@gmail.com', 'B+', '2026-02-02 19:10:17'),
(3, 'Bamlak', 'Tesfaye ', 20, 'donor', 'Addis Ababa', '1234Bam?', '0910101010', 'male', 'bam@gmail.com', 'O+', '2026-01-02 07:10:57'),
(4, 'Amanuel', 'Tesfaye ', 23, 'donor', 'Tigray', '1234Aman', '0912345678', 'male', 'AmanT@gmail.com', 'B', '2026-01-25 17:41:57'),
(22, 'Kalab', NULL, NULL, 'donor', NULL, '1234Kalab?', '0916161616', NULL, 'Kalab@gmail.com', NULL, '2026-02-17 16:13:18'),
(5, 'John ', 'Walker', 26, 'donor', 'Tigray', '1234John?', '0920000000', 'male', 'John@gmail.com', 'O-', '2026-02-02 19:27:30'),
(6, 'Rebecca ', 'Roman', 22, 'recipents', 'Addis Ababa', '1234Rebecca?', '0930000000', 'female', 'Rebecca@gmail.com', 'O-', '2026-02-02 20:21:16'),
(7, 'Teddy', 'Afro', 41, 'donor', 'Addis Ababa', '1234Teddy?', '0940000000', 'male', 'Teddy@gmail.com', 'O+', '2026-02-03 15:23:26'),
(13, 'Amanuel ', 'Yayeh ', 22, 'donor', 'Tigray', '1234Aman?', '0940829609', 'male', 'Aman@gmail.com', 'O+', '2026-02-16 12:11:55'),
(8, 'Dagmawi', 'Abebe', 40, 'recipents', 'Addis Ababa', '1234Dagi?', '0947474747', 'male', 'dagi@gmail.com', 'B+', '2026-01-31 14:55:10'),
(9, 'Tamrat', NULL, NULL, 'donor', NULL, '1234Tame?', '0950000000', NULL, 'Tame@gmail.com', NULL, '2026-02-07 09:36:48'),
(10, 'Rophnan', 'Kasa', 24, 'recipents', 'Tigray', '1234Rophi?', '0960000000', 'male', 'Rophi@gmail.com', 'B+', '2026-02-07 09:41:31'),
(11, 'Samuel ', 'Ambachew ', 22, 'donor', 'Addis Ababa', '1234sam?', '0967676767', 'male', 'Sam@gmail.com ', 'O+', '2025-12-29 14:16:30'),
(24, 'Selam', NULL, NULL, 'donor', NULL, '1234Selam?', '0970707070', NULL, 'Selam@gmail.com', NULL, '2026-02-17 16:15:41'),
(12, 'Dagm', 'Habtamu', 23, 'recipents', 'Addis Ababa', '1234Dag', '0989898989', 'male', 'Dag@gmail.com', 'O+', '2026-01-01 20:49:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY (`donation_id`),
  ADD KEY `phone_number` (`phone_numbers`),
  ADD KEY `organ_id` (`organ_id`);

--
-- Indexes for table `organ`
--
ALTER TABLE `organ`
  ADD PRIMARY KEY (`organ_id`);

--
-- Indexes for table `recipents_waitinglist`
--
ALTER TABLE `recipents_waitinglist`
  ADD PRIMARY KEY (`wait_id`),
  ADD KEY `fk_waitinglist_userphone` (`phone_number`),
  ADD KEY `fk_waitinglist_organ` (`organ_id`);

--
-- Indexes for table `rec_request`
--
ALTER TABLE `rec_request`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniqueReq` (`don_phone_number`),
  ADD KEY `fk_rec_phone_num` (`rec_phone_number`),
  ADD KEY `fk_organ_id` (`organ_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`phone_number`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `donations`
--
ALTER TABLE `donations`
  MODIFY `donation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `organ`
--
ALTER TABLE `organ`
  MODIFY `organ_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `recipents_waitinglist`
--
ALTER TABLE `recipents_waitinglist`
  MODIFY `wait_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `rec_request`
--
ALTER TABLE `rec_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `donations`
--
ALTER TABLE `donations`
  ADD CONSTRAINT `donations_ibfk_1` FOREIGN KEY (`phone_numbers`) REFERENCES `users` (`phone_number`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `donations_ibfk_2` FOREIGN KEY (`organ_id`) REFERENCES `organ` (`organ_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `recipents_waitinglist`
--
ALTER TABLE `recipents_waitinglist`
  ADD CONSTRAINT `fk_waitinglist_organ` FOREIGN KEY (`organ_id`) REFERENCES `organ` (`organ_id`),
  ADD CONSTRAINT `fk_waitinglist_userphone` FOREIGN KEY (`phone_number`) REFERENCES `users` (`phone_number`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rec_request`
--
ALTER TABLE `rec_request`
  ADD CONSTRAINT `fk_don_phone_num` FOREIGN KEY (`don_phone_number`) REFERENCES `users` (`phone_number`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_organ_id` FOREIGN KEY (`organ_id`) REFERENCES `organ` (`organ_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_rec_phone_num` FOREIGN KEY (`rec_phone_number`) REFERENCES `users` (`phone_number`) ON DELETE CASCADE ON UPDATE CASCADE;
