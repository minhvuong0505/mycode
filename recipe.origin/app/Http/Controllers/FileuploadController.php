<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Fileupload;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Input;

class FileuploadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
    public function storeVideo(Request $request){
        $fileName = null;
        if (request()->hasFile('file')) {
            $file = request()->file('file');
            $fileName = md5($file->getClientOriginalName() . time()) . "." . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/tmp/'.$fileName));  

            return response()->json(array('status'=> 'Successfully added', 'fileName'=> $fileName));
        }        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = Input::all();

        // Decode base64 data
        list($type, $data) = explode(';', $_POST['file']);
        list(, $data) = explode(',', $data);
        $file_data = base64_decode($data);
        
        // Get file mime type
        $finfo = finfo_open();
        $file_mime_type = finfo_buffer($finfo, $file_data, FILEINFO_MIME_TYPE);
        
        // File extension from mime type
        if($file_mime_type == 'image/jpeg' || $file_mime_type == 'image/jpg')
            $file_type = 'jpeg';
        else if($file_mime_type == 'image/png')
            $file_type = 'png';
        else if($file_mime_type == 'image/gif')
            $file_type = 'gif';
        else if($file_mime_type == 'video/mp4')
            $file_type = 'mp4';
        else 
            $file_type = 'other';
        
        // Validate type of file
        if(in_array($file_type, [ 'jpeg', 'png', 'gif' ])) {
            // Set a unique name to the file and save
            $file_name = uniqid() . '.' . $file_type;
            file_put_contents(public_path('uploads/tmp/') . $file_name, $file_data);
        }
        else {
            return response()->json( array('error', 'Only JPEG, PNG & GIF allowed') );
        }
        
        // $path = public_path('uploads/tmp/') . $file_name;

        // Image::make(file_get_contents($file_name))->save($path);     
        $response = array(
            'status' => 'success',
            'file' => $file_name
        );
        return response()->json( $response );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
