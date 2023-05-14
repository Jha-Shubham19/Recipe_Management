<?php
    include 'connection.php';

    if($_SERVER['REQUEST_METHOD']==='POST') {
        $sql = 'CREATE TABLE IF NOT EXISTS all_recipes (
                title varchar(30),
                descript text,
                ingredients text,
                category varchar(10),
                tag varchar(50),
                Instructions text
            );';
        
        $conn->query($sql);
        $title = $_POST['title'];
        $description = $_POST['descript'];
        $ingredients = $_POST['ingredients'];
        $category = $_POST['category'];
        $tag = $_POST['tag'];
        $instructions = $_POST['Instructions'];
        
        $sql = "SELECT * FROM all_recipes WHERE title='$title';";
        $res = $conn->query($sql);
        if($res->num_rows > 0) {
            $sql = "DELETE FROM all_recipes WHERE title='$title';";
            $res = $conn->query($sql);
        }
        $sql = "INSERT INTO all_recipes (title, descript, ingredients, category, tag, instructions) VALUES ('$title', '$description', '$ingredients', '$category', '$tag', '$instructions')";
        
        $res = $conn->query($sql);
    
        if($res === true) 
            echo "Recipe added";
        else echo "There is some issue try later";

    }

    $conn->close();

?>