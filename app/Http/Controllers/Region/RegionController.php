<?php

namespace App\Http\Controllers\Region;

use App\Models\Region;
use App\Http\Controllers\Controller;

class RegionController extends Controller
{
    public function map_region_options($data)
    {
        $arr = [];
        foreach ($data as $value) {
            array_push($arr, (object) [
                'value' => $value->name,
                'label' => $value->name,
            ]);
        }

        return $arr;
    }

    public function get_region($level)
    {
        $region = new Region();
        return
            $this->map_region_options($region->query()->where('level', '=', $level)->get());
    }

    public function update_region($is_new, $data)
    {
        $region = new Region();

        if ($is_new) {
            $region->create($data);
        }
    }
}
