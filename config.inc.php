<?php
/**
 * phpMyAdmin sample configuration, you can use it as base for
 * manual configuration. For easier setup you can use setup/
 *
 * All directives are explained in documentation in the doc/ folder
 * or at <https://docs.phpmyadmin.net/>.
 */


/**
 * This is needed for cookie based authentication to encrypt the cookie.
 * Needs to be a 32-bytes long string of random bytes. See FAQ 2.10.
 */
$cfg['blowfish_secret'] = ''; /* YOU MUST FILL IN THIS FOR COOKIE AUTH! */

/**
 * Servers configuration
 */
$i = 0;

/**
 * First server
 */
$i++;
/* Authentication type */
$cfg['Servers'][0]['auth_type'] = 'cookie';
/* Server parameters */
$cfg['Servers'][$i]['host'] = '51.44.177.27';
//$cfg['Servers'][$i]['compress'] = false;
$cfg['Servers'][$i]['AllowNoPassword'] = false;
//$cfg['Servers'][$i]['verbose'] = 'Remote DB (51.44.177.27)';
//$cfg['AllowArbitraryServer'] = false;
//$cfg['ServerDefault'] = 1;

$cfg['UploadDir'] = '';
$cfg['SaveDir'] = '';

