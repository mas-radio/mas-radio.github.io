<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'masradionet_wp578' );

/** Database username */
define( 'DB_USER', 'masradionet_wp578' );

/** Database password */
define( 'DB_PASSWORD', '0-f3i@09Sp' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '6tvmlgagjjbzywpuh9vpcwsdrjmdmql97a4qnlamqbge1dmmuxevwl9ghjto4alq' );
define( 'SECURE_AUTH_KEY',  '8cftgrdhu7lq00gln2u3dlmi9cir7nktvfaiunf9qn3iumwsc4j4yrcop7h7blv2' );
define( 'LOGGED_IN_KEY',    'nzfklel3hoeoosfh8se5hmdtyzth0ogv8whalme63laj8mudshyygvuszovimzbp' );
define( 'NONCE_KEY',        '0jvxcttilxld5pfmulq0moikcve0gsy4uiwoz42p883hcv5yigz5l2jmapdkqs46' );
define( 'AUTH_SALT',        'zggboso12z6abbqovfihyxpprt2uelkiktsfexdi4tvw3lkkpf8ukplqpqyi5fej' );
define( 'SECURE_AUTH_SALT', 'fnu5knm9robttg92mucd8ja4y4kttkwfwqh00ghpsl5kx7gq61mndku6n5vqzvga' );
define( 'LOGGED_IN_SALT',   '4umhibo39coksxpzet8kabkthrfsnqo6gfurkurthmhti09mfzctsf40mcqbpr8a' );
define( 'NONCE_SALT',       'ckslihukz2gah4obwar2ov7salr4aog6ytsahq3ay5mv3kxckzdjugsmue0dtjqb' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wpi9_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
