<?php

namespace App\Http\Controllers\Property;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Region\RegionController;
use App\Models\District;
use App\Models\Property;
use App\Models\Province;
use App\Models\Regency;
use App\Models\Region;
use App\Models\Village;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FindProperty extends Controller
{
    public function index(Request $request)
    {
        $data = json_decode($request->data);
        $properties = Property::query();
        $properties->with(['images']);
        $paginator = $properties->paginate(8);

        // dd($data);

        if ($data) {
            $properties->where(function ($query) use ($data) {
                foreach ($data->filters->where as $filter) {
                    $query->where($filter[0], $filter[1], $filter[2]);
                }
            })->where(function ($query) use ($data) {
                if ($data->sq != '') {
                    $query
                        ->orWhere('village', 'LIKE', "%{$data->sq}%")
                        ->orWhere('district', 'LIKE', "%{$data->sq}%")
                        ->orWhere('regency', 'LIKE', "%{$data->sq}%")
                        ->orWhere('province', 'LIKE', "%{$data->sq}%");
                }

                foreach ($data->filters->orWhere as $filter) {
                    $query->orWhere($filter[0], $filter[1], $filter[2]);
                }
            });

            $properties->orderBy($data->sort->by, $data->sort->method);
        } else {
            $properties->where('status', '=', 'for sale');
        }

        $properties->orderBy('price', 'asc');

        $properties = $properties->latest()->get();

        $regionController = new RegionController();

        $villages = $regionController->get_region('village');
        $districts = $regionController->get_region('district');
        $regencies = $regionController->get_region('regency');
        $provinces = $regionController->get_region('province');

        return Inertia::render('FindProperty/Index', [
            'properties' => fn () => $properties,
            'filterOptions' => (object) [
                'villages' => $villages,
                'districts' => $districts,
                'regencies' => $regencies,
                'provinces' => $provinces
            ],
            'lastPage' => fn () => $paginator->lastPage(),
        ]);
    }
}
