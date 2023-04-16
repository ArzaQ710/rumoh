<?php

namespace App\Http\Controllers\Property;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Region\RegionController;

class PropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $properties = Property::query();
        $properties->with(['images']);
        $paginator = $properties->paginate(8);

        if ($request->status) {
            $properties->where('status', '=', $request->status);
        } else {
            $properties->where('status', '=', 'for sale');
        }

        $properties = $properties->latest()->get();

        $registerProperty = new RegisterPropertyController();

        $regionController = new RegionController();

        $villages = $regionController->get_region('village');
        $districts = $regionController->get_region('district');
        $regencies = $regionController->get_region('regency');
        $provinces = $regionController->get_region('province');

        // dd($properties);

        return Inertia::render('Property/Index', [
            'properties' => fn () => $properties,
            'regionOptions' => (object) [
                'villages' => $villages,
                'districts' => $districts,
                'regencies' => $regencies,
                'provinces' => $provinces
            ],
            'lastPage' => fn () => $paginator->lastPage(),
        ]);
    }

    public function detail($id)
    {
        $property = Property::where('id', '=', $id)->with(['images'])->first();
        // dd($property);

        return Inertia::render('Property/Detail', [
            'property' => fn () => $property,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'propertyName' => 'required',
            'description' => 'required',
            'price' => 'required',
            'numberOfBedroom' => 'required',
            'numberOfBathroom' => 'required',
            'landArea' => 'required',
            'status' => 'required',
            'map' => 'required',
            'street' => 'required',
            'village' => 'required',
            'district' => 'required',
            'regency' => 'required',
            'province' => 'required',
        ]);

        $regionController = new RegionController();

        $regionController->update_region(
            array_key_exists('__isNew__', $validated['village']),
            ['level' => 'village', 'name' => $validated['village']['value']]
        );
        $regionController->update_region(
            array_key_exists('__isNew__', $validated['district']),
            ['level' => 'district', 'name' => $validated['district']['value']]
        );
        $regionController->update_region(
            array_key_exists('__isNew__', $validated['regency']),
            ['level' => 'regency', 'name' => $validated['regency']['value']]
        );
        $regionController->update_region(
            array_key_exists('__isNew__', $validated['province']),
            ['level' => 'province', 'name' => $validated['province']['value']]
        );

        $images = array();

        if ($files = $request->file('images')) {
            foreach ($files as $file) {
                $image_name = md5(rand(1000, 10000));
                $ext = strtolower($file->getClientOriginalExtension());
                $image_full_name = $image_name . '.' . $ext;
                $upload_path = 'assests/images/';
                $image_url = $upload_path . $image_full_name;
                $file->move($upload_path, $image_full_name);
                $images[] = [
                    'image_url' => $image_url,
                ];
            }
        }

        $property = new Property();
        $property->name = $validated['propertyName'];
        $property->description = $validated['description'];
        $property->status = $validated['status'];
        $property->price = $validated['price'];
        $property->number_of_bedroom = $validated['numberOfBedroom'];
        $property->number_of_bathroom = $validated['numberOfBathroom'];
        $property->land_area = $validated['landArea'];
        $property->street = $validated['street'];
        $property->village = $validated['village']['value'];
        $property->district = $validated['district']['value'];
        $property->regency = $validated['regency']['value'];
        $property->province = $validated['province']['value'];
        $property->map_coord = $validated['map'];

        $property->save();

        $property->images()->createMany($images);

        return redirect(route('admin.index'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Property  $property
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Property $property)
    {
        $validated = $request->validate([
            'propertyName' => 'required',
            'description' => 'required',
            'status' => 'required',
            'price' => 'required',
            'numberOfBedroom' => 'required',
            'numberOfBathroom' => 'required',
            'landArea' => 'required',
            'map' => 'required',
            'street' => 'required',
            'village' => 'required',
            'district' => 'required',
            'regency' => 'required',
            'province' => 'required',
        ]);

        $property->name = $validated['propertyName'];
        $property->description = $validated['description'];
        $property->status = $validated['status'];
        $property->price = $validated['price'];
        $property->number_of_bedroom = $validated['numberOfBedroom'];
        $property->number_of_bathroom = $validated['numberOfBathroom'];
        $property->land_area = $validated['landArea'];
        $property->street = $validated['street'];
        $property->village = $validated['village']['value'];
        $property->district = $validated['district']['value'];
        $property->regency = $validated['regency']['value'];
        $property->province = $validated['province']['value'];
        $property->map_coord = $validated['map'];

        $property->save();

        return redirect(route('admin.index'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Property  $property
     * @return \Illuminate\Http\Response
     */
    public function destroy(Property $property)
    {
        $property->delete();

        return redirect(route('property.index'));
    }

    public function map_address_options($data)
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

    public function filter($model, $column, $value)
    {
        return $model->where($column, '=', $value);
    }
}
