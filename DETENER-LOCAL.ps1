$ErrorActionPreference='Stop'
$pidFile=Join-Path $PSScriptRoot '.runtime/processes.json'
if (-not (Test-Path -LiteralPath $pidFile)) {Write-Host 'No hay procesos registrados por INICIAR-LOCAL.ps1.'; exit}
foreach ($entry in @(Get-Content -LiteralPath $pidFile -Raw | ConvertFrom-Json)) {
    $process=Get-CimInstance Win32_Process -Filter "ProcessId=$($entry.Id)" -ErrorAction SilentlyContinue
    if ($process -and $process.CommandLine -like ('*'+$entry.Script+'*')) {Stop-Process -Id $entry.Id; Write-Host "Proceso del proyecto detenido: $($entry.Id)"}
}
Write-Host 'MySQL no se detiene: la base aislada permanece disponible en 3308.'
