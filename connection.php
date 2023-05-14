<?php
    $host = 'localhost';
    $username = 'root';
    $pass = '';
    $database = 'my_recipe';

    $conn = new mysqli($host,$username,$pass);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $sql = sprintf('CREATE DATABASE IF NOT EXISTS %s',$database);
    $conn->query($sql);

    $conn = new mysqli($host,$username,$pass,$database);
?>