-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 23, 2026 at 10:13 AM
-- Server version: 8.0.30
-- PHP Version: 8.5.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `campmate`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lecturer` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '#c9d68b',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `user_id`, `name`, `code`, `lecturer`, `color`, `created_at`, `updated_at`) VALUES
(1, 3, 'Pemrograman WEB', 'INF-201', 'Rini', '#c8d889', '2026-06-03 08:09:49', '2026-06-03 08:09:49'),
(2, 3, 'Etika Teknologi Informasi', 'Inf-110', 'Ardhi', '#c8d889', '2026-06-03 08:11:08', '2026-06-03 08:11:08'),
(3, 3, 'TEs', '123', 'aaa', '#c8d889', '2026-06-03 10:58:45', '2026-06-03 10:58:45'),
(4, 4, 'Sistem Informasi', 'INF-202', 'Amalia', '#c8d889', '2026-06-03 23:25:25', '2026-06-03 23:25:25');

-- --------------------------------------------------------

--
-- Table structure for table `course_schedules`
--

CREATE TABLE `course_schedules` (
  `id` bigint UNSIGNED NOT NULL,
  `course_id` bigint UNSIGNED NOT NULL,
  `day_of_week` enum('monday','tuesday','wednesday','thursday','friday','saturday','sunday') COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `room` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `course_schedules`
--

INSERT INTO `course_schedules` (`id`, `course_id`, `day_of_week`, `start_time`, `end_time`, `room`, `created_at`, `updated_at`) VALUES
(1, 1, 'monday', '08:00:00', '09:40:00', 'E.2.7', '2026-06-03 08:09:49', '2026-06-03 08:09:49'),
(2, 2, 'wednesday', '14:00:00', '15:40:00', 'E.2.7', '2026-06-03 08:11:08', '2026-06-03 08:11:08'),
(3, 3, 'thursday', '15:00:00', '17:00:00', 'a23', '2026-06-03 10:58:45', '2026-06-03 10:58:45'),
(4, 4, 'thursday', '07:00:00', '09:00:00', 'D32', '2026-06-03 23:25:25', '2026-06-03 23:25:25');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` smallint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_01_01_000000_create_passkeys_table', 1),
(5, '2025_08_14_170933_add_two_factor_columns_to_users_table', 1),
(6, '2026_06_03_000001_create_courses_table', 1),
(7, '2026_06_03_000002_create_course_schedules_table', 1),
(8, '2026_06_03_000003_create_subjects_table', 2),
(9, '2026_06_03_000004_create_study_sessions_table', 2),
(10, '2026_06_03_000005_create_session_participants_table', 2),
(11, '2026_06_03_000006_create_session_comments_table', 2),
(12, '2026_06_03_210000_add_role_and_profile_photo_to_users_table', 3),
(13, '2026_06_03_210010_create_study_auth_support_tables', 3),
(14, '2026_06_03_185805_add_avatar_to_users_table', 4);

-- --------------------------------------------------------

--
-- Table structure for table `passkeys`
--

CREATE TABLE `passkeys` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `credential_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `credential` json NOT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('09DrPbyO39mCtLHnHteQ40rq8KDnRG0RZlIuJR3l', 4, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJDSHQ4M3Z2SU1xTWU0U0hwT3Y4YTNBanJTN3ZhbEhIa1JieUtmbldLIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwIiwicm91dGUiOiJsYW5kaW5nIn0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfSwibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiOjR9', 1780815359),
('1ngye1PCzB6KqKmmefKtvEbtOrsa9y7SNNIhTvZt', 4, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJGUURDNFpEOXF3ZVd3VkVaV0hLa1F4amU5MmlzS0hiYldJMjB6dkpaIiwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119LCJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI6NH0=', 1780554707),
('LqG9sU7T2C3ysiTu6zEmBIZUpfXHu3LWp5UMkCz4', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJBdktkQ3ljVHFwWlpibjRWaDFpSHdBV0w0eTlZMU1NQjhaODJyOXJlIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwIiwicm91dGUiOiJsYW5kaW5nIn0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1780815387),
('muz1rOanAkp9x6LekhnGpSSgT06N6znmpMuLrpu5', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJLcm1sTWl2cE9wRXY0Z2JvaGc2RlFXZW5zZHUwOUNkUVVpYWV4MWZwIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwIiwicm91dGUiOiJsYW5kaW5nIn0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1780550161),
('yZ8nu4y4OpM0ZFWwopeGKSNqDwyGxnjpk0veAHcW', 4, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJvOVYySjRyS25pWWJLWkFaVWRDVzZDa0dRZms0aWExaFZYdER0VFR6IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwIiwicm91dGUiOiJsYW5kaW5nIn0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfSwidXJsIjpbXSwibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiOjR9', 1780932018);

-- --------------------------------------------------------

--
-- Table structure for table `session_comments`
--

CREATE TABLE `session_comments` (
  `id` bigint UNSIGNED NOT NULL,
  `study_session_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `session_participants`
--

CREATE TABLE `session_participants` (
  `id` bigint UNSIGNED NOT NULL,
  `study_session_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `status` enum('joined','left') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'joined',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `session_participants`
--

INSERT INTO `session_participants` (`id`, `study_session_id`, `user_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 3, 'joined', '2026-06-03 10:42:42', '2026-06-03 11:41:53'),
(2, 1, 4, 'joined', '2026-06-03 10:51:43', '2026-06-03 23:23:52');

-- --------------------------------------------------------

--
-- Table structure for table `study_sessions`
--

CREATE TABLE `study_sessions` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `subject_id` bigint UNSIGNED NOT NULL,
  `title` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `session_type` enum('offline','online','hybrid') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'offline',
  `location` varchar(160) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meeting_platform` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meeting_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `session_date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `max_participants` int UNSIGNED NOT NULL DEFAULT '2',
  `status` enum('open','full','done','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'open',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `study_sessions`
--

INSERT INTO `study_sessions` (`id`, `user_id`, `subject_id`, `title`, `description`, `session_type`, `location`, `meeting_platform`, `meeting_link`, `session_date`, `start_time`, `end_time`, `max_participants`, `status`, `created_at`, `updated_at`) VALUES
(1, 3, 1, 'Belajar Laravel', NULL, 'offline', 'Cafe', NULL, NULL, '2026-06-18', '15:00:00', '17:00:00', 5, 'open', '2026-06-03 10:42:42', '2026-06-03 10:42:42');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `name`, `code`, `description`, `created_at`, `updated_at`) VALUES
(1, 'PBW', NULL, NULL, '2026-06-03 10:42:42', '2026-06-03 10:42:42'),
(2, 'PBE', NULL, NULL, '2026-06-03 22:29:04', '2026-06-03 22:29:04');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `profile_photo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `two_factor_secret` text COLLATE utf8mb4_unicode_ci,
  `two_factor_recovery_codes` text COLLATE utf8mb4_unicode_ci,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `profile_photo`, `two_factor_secret`, `two_factor_recovery_codes`, `two_factor_confirmed_at`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Test User', 'test@example.com', '2026-06-03 03:36:45', '$2y$12$qAHxQC60kBIz7y0YnijhV.B374sGeCYHjdyLgLU224mwMjzroZ2Va', 'user', NULL, NULL, NULL, NULL, 'F7ySAfKrmH', '2026-06-03 03:36:45', '2026-06-03 03:36:45'),
(2, 'Test', 'test@tester.com', NULL, '$2y$12$uglwoT1jGX4FB/kborSqnuDlauSnqZBFKG4JUs/YDW5SaJsK7kHlu', 'user', NULL, NULL, NULL, NULL, NULL, '2026-06-03 03:51:55', '2026-06-03 03:51:55'),
(3, 'Admin CampusMate', 'admin@campusmate.local', NULL, '$2y$12$Zz79.kByu.fTmXjKWupL2ed2z1GeFPfDzDS/lKY3ZvGJ00jZm992y', 'admin', NULL, NULL, NULL, NULL, NULL, '2026-06-03 07:49:07', '2026-06-03 07:49:07'),
(4, 'Demo', 'user@local.com', NULL, '$2y$12$HdfWxixPgb5qtWx5mUpxuuYXcPy9na4XQRr7pJilCNDTM6.1hLK2y', 'user', 'profiles/xf5usDsFBDD5JRz5xuOhXrm6RapJ8YhiEXGVRxAw.jpg', NULL, NULL, NULL, 'mjyyz7Hos5G9TDp7BaN5aHjZtrLg6up57gXK1tX6eGGNWutFwfhieyDlp7Dh', '2026-06-03 07:49:07', '2026-06-03 12:12:59'),
(5, 'Lutfi', 'lutfi@test.com', NULL, '$2y$12$CVbvNDqheCnj0P0HLJZLH.ePASaOO48b11WYVxj3c6C31rgjjA8Bu', 'user', NULL, NULL, NULL, NULL, NULL, '2026-06-03 08:16:53', '2026-06-03 08:16:53');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courses_user_id_foreign` (`user_id`);

--
-- Indexes for table `course_schedules`
--
ALTER TABLE `course_schedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_schedules_course_id_foreign` (`course_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`),
  ADD KEY `failed_jobs_connection_queue_failed_at_index` (`connection`,`queue`,`failed_at`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `passkeys`
--
ALTER TABLE `passkeys`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `passkeys_credential_id_unique` (`credential_id`),
  ADD KEY `passkeys_user_id_index` (`user_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `session_comments`
--
ALTER TABLE `session_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `session_comments_user_id_foreign` (`user_id`),
  ADD KEY `session_comments_study_session_id_created_at_index` (`study_session_id`,`created_at`);

--
-- Indexes for table `session_participants`
--
ALTER TABLE `session_participants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `session_participants_study_session_id_user_id_unique` (`study_session_id`,`user_id`),
  ADD KEY `session_participants_user_id_status_index` (`user_id`,`status`);

--
-- Indexes for table `study_sessions`
--
ALTER TABLE `study_sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `study_sessions_user_id_foreign` (`user_id`),
  ADD KEY `study_sessions_status_session_date_end_time_index` (`status`,`session_date`,`end_time`),
  ADD KEY `study_sessions_subject_id_session_date_index` (`subject_id`,`session_date`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `course_schedules`
--
ALTER TABLE `course_schedules`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `passkeys`
--
ALTER TABLE `passkeys`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `session_comments`
--
ALTER TABLE `session_comments`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `session_participants`
--
ALTER TABLE `session_participants`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `study_sessions`
--
ALTER TABLE `study_sessions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `course_schedules`
--
ALTER TABLE `course_schedules`
  ADD CONSTRAINT `course_schedules_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `passkeys`
--
ALTER TABLE `passkeys`
  ADD CONSTRAINT `passkeys_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `session_comments`
--
ALTER TABLE `session_comments`
  ADD CONSTRAINT `session_comments_study_session_id_foreign` FOREIGN KEY (`study_session_id`) REFERENCES `study_sessions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `session_comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `session_participants`
--
ALTER TABLE `session_participants`
  ADD CONSTRAINT `session_participants_study_session_id_foreign` FOREIGN KEY (`study_session_id`) REFERENCES `study_sessions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `session_participants_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `study_sessions`
--
ALTER TABLE `study_sessions`
  ADD CONSTRAINT `study_sessions_subject_id_foreign` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `study_sessions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
