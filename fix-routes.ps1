# PowerShell script to fix case-sensitive route folders for git/Vercel
# Windows sees Kontakt = kontakt, but git/Linux doesn't

$appDir = "src/app"

$renames = @(
    @{ Old = "Kontakt"; New = "kontakt" },
    @{ Old = "Rezervacny-system"; New = "rezervacny-system" }
)

foreach ($r in $renames) {
    $oldPath = Join-Path $appDir $r.Old
    $tempName = "_temp_" + $r.New
    $tempPath = Join-Path $appDir $tempName

    if (Test-Path $oldPath) {
        Write-Host "Renaming $($r.Old) -> $($r.New)..."
        Rename-Item -Path $oldPath -NewName $tempName -Force
        Rename-Item -Path $tempPath -NewName $r.New -Force
        Write-Host "  Done!"
    } else {
        Write-Host "Folder $oldPath not found, skipping."
    }
}

Write-Host "`nAll renames complete. Now run:"
Write-Host "  git add -A"
Write-Host "  git commit -m 'fix: rename routes to lowercase for Vercel'"
Write-Host "  git push"
