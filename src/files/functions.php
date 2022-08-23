<?php

function get_image_size($file)
{
    list($width, $height, $type, $attr) = getimagesize($file);
    return $attr;
}