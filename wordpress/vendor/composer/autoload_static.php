<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInita06d2060687a3dfabf456b99aa653606
{
    public static $prefixesPsr0 = array (
        'j' => 
        array (
            'johnpbloch\\Composer\\' => 
            array (
                0 => __DIR__ . '/..' . '/johnpbloch/wordpress-core-installer/src',
            ),
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixesPsr0 = ComposerStaticInita06d2060687a3dfabf456b99aa653606::$prefixesPsr0;

        }, null, ClassLoader::class);
    }
}
