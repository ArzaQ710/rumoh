<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PortalController extends Controller
{
    public function index(Request $request)
    {
        dd($request->hash);
    }

    public function decode()
    {
        $key = pack("H*", "0123456789abcdef0123456789abcdef");
        $iv =  pack("H*", "abcdef9876543210abcdef9876543210");
        $encrypted = base64_decode('MwOfGGCYPBEpQ0ImKQsgyA==');
        $decrypt_string = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, $encrypted, MCRYPT_MODE_CBC, $iv);

        return $decrypt_string;
    }
}
