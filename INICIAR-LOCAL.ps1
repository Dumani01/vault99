$ErrorActionPreference = 'Stop'
$projectRoot = $PSScriptRoot
$runtimePath = Join-Path $projectRoot '.runtime'
New-Item -ItemType Directory -Force -Path $runtimePath | Out-Null
$nodePath = (Get-Command node.exe).Source
$mysqlData = [IO.Path]::GetFullPath((Join-Path $projectRoot '../../work/mysql-data'))
$mysqlBinary = 'C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld.exe'
$owned = @()
$existingPidFile = Join-Path $runtimePath 'processes.json'
if (Test-Path -LiteralPath $existingPidFile) { $owned = @(Get-Content -LiteralPath $existingPidFile -Raw | ConvertFrom-Json) }
if ((Test-Path -LiteralPath $mysqlData) -and (Test-Path -LiteralPath $mysqlBinary)) {
    $listening = Get-NetTCPConnection -LocalPort 3308 -State Listen -ErrorAction SilentlyContinue
    if (-not $listening) {
        $mysqlBase = Split-Path (Split-Path $mysqlBinary)
        $arguments = @('--no-defaults', '--console', ('--basedir="' + $mysqlBase + '"'), ('--datadir="' + $mysqlData + '"'), '--port=3308', '--bind-address=127.0.0.1', '--mysqlx=0')
        Start-Process -FilePath $mysqlBinary -ArgumentList $arguments -WindowStyle Hidden -RedirectStandardOutput (Join-Path $runtimePath 'mysql.log') -RedirectStandardError (Join-Path $runtimePath 'mysql-error.log') | Out-Null
        Start-Sleep -Seconds 3
    }
}
if (-not (Test-Path -LiteralPath (Join-Path $projectRoot 'backend/.env'))) {throw 'Configura backend/.env según README.md antes de iniciar.'}
foreach ($service in @(
    @{Name='api'; Port=3011; Directory='backend'; Script='backend/server.js'; Extra=''},
    @{Name='frontend'; Port=5173; Directory='frontend'; Script='frontend/node_modules/vite/bin/vite.js'; Extra='--host 127.0.0.1'}
)) {
    if (Get-NetTCPConnection -LocalPort $service.Port -State Listen -ErrorAction SilentlyContinue) {Write-Host "Puerto $($service.Port) ya está en uso; no se inicia otro proceso."; continue}
    $scriptPath=Join-Path $projectRoot $service.Script
    if (-not (Test-Path -LiteralPath $scriptPath)) {throw "Faltan dependencias. Ejecuta npm ci en $($service.Directory)."}
    $arguments = '"' + $scriptPath + '" ' + $service.Extra
    $started=Start-Process -FilePath $nodePath -ArgumentList $arguments -WorkingDirectory (Join-Path $projectRoot $service.Directory) -WindowStyle Hidden -PassThru -RedirectStandardOutput (Join-Path $runtimePath ($service.Name+'.log')) -RedirectStandardError (Join-Path $runtimePath ($service.Name+'-error.log'))
    $owned += @{Id=$started.Id; Script=$scriptPath}
}
if ($owned.Count -gt 0) {ConvertTo-Json -InputObject @($owned) | Set-Content -LiteralPath (Join-Path $runtimePath 'processes.json') -Encoding utf8}
Start-Sleep -Seconds 2
Write-Host 'VAULT 99: http://127.0.0.1:5173/'
Write-Host 'Gestión: http://127.0.0.1:5173/#gestion'
Write-Host 'MySQL se mantiene iniciado para conservar la sesión; solo escucha en 127.0.0.1.'

