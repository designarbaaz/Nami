# Run once as Administrator to enable http://nami.localhost:3000
$hostsPath = "$env:SystemRoot\System32\drivers\etc\hosts"
$entry = "127.0.0.1   nami.localhost"

$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).
  IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
  Write-Host "Re-launching as Administrator..."
  Start-Process powershell -Verb RunAs -ArgumentList "-ExecutionPolicy Bypass -File `"$PSCommandPath`""
  exit
}

$content = Get-Content $hostsPath -Raw
if ($content -match "nami\.localhost") {
  Write-Host "OK: nami.localhost already present in hosts file."
} else {
  Add-Content -Path $hostsPath -Value "`r`n$entry"
  Write-Host "Added: $entry"
}

Write-Host ""
Write-Host "Then run: npm run dev"
Write-Host "Open:     http://nami.localhost:3000"
Pause
