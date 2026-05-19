$bytes = [System.IO.File]::ReadAllBytes("public\MannPatel_resume.pdf")
$text = [System.Text.Encoding]::UTF8.GetString($bytes)

# Extract text between parentheses (PDF text objects)
$matches = [regex]::Matches($text, '\(([^)]{3,})\)')
$allText = @()
foreach ($m in $matches) {
    $val = $m.Groups[1].Value
    # Filter out binary junk - only keep printable ASCII text
    if ($val -match '^[\x20-\x7E\s]+$' -and $val.Length -gt 2) {
        $allText += $val
    }
}

# Also extract text from BT...ET blocks
$btMatches = [regex]::Matches($text, 'BT\s*(.*?)\s*ET', [System.Text.RegularExpressions.RegexOptions]::Singleline)
foreach ($m in $btMatches) {
    $inner = $m.Groups[1].Value
    $textInner = [regex]::Matches($inner, '\(([^)]+)\)')
    foreach ($t in $textInner) {
        $val = $t.Groups[1].Value
        if ($val -match '^[\x20-\x7E\s]+$' -and $val.Length -gt 1) {
            $allText += $val
        }
    }
}

# Also try to get /Title entries
$titleMatches = [regex]::Matches($text, '/Title\s*\(([^)]+)\)')
foreach ($m in $titleMatches) {
    Write-Output "=== TITLE: $($m.Groups[1].Value) ==="
}

Write-Output ""
Write-Output "=== ALL TEXT ==="
$allText | Select-Object -Unique | ForEach-Object { Write-Output $_ }
