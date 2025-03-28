<?php
// server/routes/vendor_routes.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../models/Vendor.php';

// Database connection
$database = new Database();
$db = $database->getConnection();

// Vendor object
$vendor = new Vendor($db);

// Get request method
$request_method = $_SERVER["REQUEST_METHOD"];

switch($request_method) {
    case 'GET':
        // Fetch all vendors
        $stmt = $vendor->read();
        $num = $stmt->rowCount();

        if($num > 0) {
            $vendors_arr = array();
            $vendors_arr["records"] = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $vendor_item = array(
                    "id" => $id,
                    "name" => $name,
                    "category" => $category,
                    "email" => $email
                );

                array_push($vendors_arr["records"], $vendor_item);
            }

            http_response_code(200);
            echo json_encode($vendors_arr);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "No vendors found."));
        }
        break;

    case 'POST':
        // Create vendor
        $data = json_decode(file_get_contents("php://input"));

        if(!empty($data->name) && !empty($data->category)) {
            $vendor->name = $data->name;
            $vendor->category = $data->category;
            $vendor->email = $data->email;
            $vendor->phone = $data->phone;
            $vendor->description = $data->description;

            if($vendor->create()) {
                http_response_code(201);
                echo json_encode(array("message" => "Vendor was created."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to create vendor."));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Incomplete vendor data."));
        }
        break;

    default:
        // Invalid Request Method
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}
?>