<?php
    include 'connection.php';
    
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        // echo print_r($_POST);
        $functionName = $_POST['functionName'];
        switch($functionName) {
            case 'getData':
                $response = getData($_POST['text']);
                echo $response;
                break;
            case 'delete':
                $res = deleteRecipe($_POST['title']);
                echo $res;
                break;
            case 'getDataPara':
                $res = getDataPara($_POST['title']);
                echo $res;
                break;
        }
    }
    function getData($text) {
        global $conn;
        // echo $text;
        // $text = "%".$text."%";
        $sql = "SELECT * FROM all_recipes WHERE ingredients LIKE '%$text%' OR category = '$text';";
        $res = $conn->query($sql);
        
        $response = array();
        if($res->num_rows > 0) {
            while ($row = $res->fetch_assoc()) 
                array_push($response,$row);
        }
        
        return json_encode($response);
    }
    function getDataPara($title) {
        global $conn;
        $sql = "SELECT * FROM all_recipes WHERE title='$title';";
        $res = $conn->query($sql);
    
        $response = $res->fetch_assoc();
        // echo $response;

        return json_encode($response);
    }
    function deleteRecipe($title) {
        global $conn;
        $sql = "DELETE FROM all_recipes WHERE title='$title';";
        $res = $conn->query($sql);

        return $res;
    }
    $conn->close();
?>