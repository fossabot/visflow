<?php
header('Content-type: application/json');

function abort($msg='') {
  $response['status'] = 'error';
  $response['msg'] = $msg;
  echo json_encode($response);
  exit();
}

if (!isset($_POST['type']))
  abort('post type not set for load.php');

if ($_POST['type'] == 'filelist') {
  $filelist = glob('save/*.json');

  $result = array();
  for($i = 0; $i < count($filelist); $i++) {
    $filename = substr($filelist[$i], 5, strlen($filelist[$i]) - 10); // remove "save/" and ".json"
    array_push($result, array(
      'filename' => $filename,
      'mtime' => filemtime($filelist[$i]) * 1000
    ));
  }
  $response = array();
  $response['filelist'] = $result;

} elseif ($_POST['type'] == 'download') {
  $filepath = 'save/'.$_POST['filename'].'.json';
  if (!file_exists($filepath))
    abort('file does not exist');

  $dataflow = json_decode(file_get_contents($filepath));
  $response['dataflow'] = $dataflow;
}
$response['status'] = 'success';
echo json_encode($response);

?>