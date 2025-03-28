<?php
// server/models/Vendor.php
class Vendor {
    private $conn;
    private $table_name = "vendors";

    public $id;
    public $name;
    public $category;
    public $email;
    public $phone;
    public $description;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Create Vendor
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                  SET name=:name, category=:category, 
                      email=:email, phone=:phone, description=:description";
        
        $stmt = $this->conn->prepare($query);

        // Sanitize
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->category = htmlspecialchars(strip_tags($this->category));

        // Bind values
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":phone", $this->phone);
        $stmt->bindParam(":description", $this->description);

        // Execute query
        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Read Vendors
    public function read() {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }
}
?>