<?php

namespace App\Http\Controllers\Property;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Region\RegionController;
use App\Models\RegisterProperty;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Region;
use PhpParser\Node\Expr\FuncCall;

class RegisterPropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $regionController = new RegionController();

        $villages = $regionController->get_region('village');
        $districts = $regionController->get_region('district');
        $regencies = $regionController->get_region('regency');
        $provinces = $regionController->get_region('province');

        return Inertia::render(
            'RegisterProperty/Index',
            ['regionOptions' => (object) [
                'villages' => $villages,
                'districts' => $districts,
                'regencies' => $regencies,
                'provinces' => $provinces
            ]]
        );
    }

    public function admin() {
        
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
            'owner_name' => 'required',
            'owner_email' => 'required',
            'owner_number' => 'required',
            'street' => 'required',
            'street' => 'required',
            'village' => 'required',
            'district' => 'required',
            'regency' => 'required',
            'province' => 'required',
            'description' => 'required',
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

        $register_property = new RegisterProperty();

        $register_property->create([
            'owner_name' => $validated['owner_name'],
            'owner_email' => $validated['owner_email'],
            'owner_number' => $validated['owner_number'],
            'street' => $validated['street'],
            'village' => $validated['village']['value'],
            'district' => $validated['district']['value'],
            'regency' => $validated['regency']['value'],
            'province' => $validated['province']['value'],
            'description' => $validated['description'],
        ]);

        return redirect(route('daftar.index'));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\RegisterProperty  $registerProperty
     * @return \Illuminate\Http\Response
     */
    public function show(RegisterProperty $registerProperty)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\RegisterProperty  $registerProperty
     * @return \Illuminate\Http\Response
     */
    public function edit(RegisterProperty $registerProperty)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\RegisterProperty  $registerProperty
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, RegisterProperty $registerProperty)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\RegisterProperty  $registerProperty
     * @return \Illuminate\Http\Response
     */
    public function destroy(RegisterProperty $registerProperty)
    {
        //
    }
}
