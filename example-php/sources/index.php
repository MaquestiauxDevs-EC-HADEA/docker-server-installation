<?php

// Database connection parameters
$host = getenv('DATABASE_HOST');
$port = getenv('DATABASE_PORT');
$sid = getenv('DATABASE_SID');
$username = getenv('DATABASE_USER');
$password = getenv('DATABASE_USER_PWD');

// echo "host: " . $host . "<br>";
// echo "port: " . $port . "<br>";
// echo "sid: " . $sid . "<br>";
// echo "username: " . $username . "<br>";
// echo "password: " . $password . "<br>";

// Check if required environment variables are set
if (!$host || !$port || !$sid || !$username || !$password || empty($host) || empty($port) || empty($sid) || empty($username) || empty($password)) {
    die("Error: Required environment variables are not set.");
}

// Attempting to establish a connection
$conn = oci_connect($username, $password, "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=$host)(PORT=$port))(CONNECT_DATA=(SID=$sid)))");

if (!$conn) {
    $e = oci_error();
    die("Error: " . htmlentities($e['message'], ENT_QUOTES));
}

// SQL query to retrieve records from APP_USERS table
$sql = "SELECT UUID, EMAIL, FIRSTNAME, LASTNAME FROM APP_USERS";

// Executing the query
$statement = oci_parse($conn, $sql);

if (!$statement) {
    $e = oci_error($conn);
    die("Error: " . htmlentities($e['message'], ENT_QUOTES));
}

// Executing the statement
$result = oci_execute($statement);

if (!$result) {
    $e = oci_error($statement);
    die("Error: " . htmlentities($e['message'], ENT_QUOTES));
}

// Fetching and displaying the results
while ($row = oci_fetch_assoc($statement)) {
    echo "UUID: " . $row['UUID'] . "<br>";
    echo "EMAIL: " . $row['EMAIL'] . "<br>";
    echo "FIRSTNAME: " . $row['FIRSTNAME'] . "<br>";
    echo "LASTNAME: " . $row['LASTNAME'] . "<br><br>";
}

// Closing the connection
oci_free_statement($statement);
oci_close($conn);



// phpinfo();