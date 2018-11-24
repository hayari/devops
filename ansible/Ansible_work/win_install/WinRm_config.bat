$url = "https://raw.githubusercontent.com/ansible/ansible/devel/examples/scripts/ConfigureRemotingForAnsible.ps1"
$file = "$env:temp\ConfigureRemotingForAnsible.ps1"

rem (New-Object -TypeName System.Net.WebClient).DownloadFile($url, $file)

rem powershell.exe -ExecutionPolicy ByPass -File $file
powershell.exe -ExecutionPolicy ByPass -File .\ConfigureRemotingForAnsible.ps1
pause