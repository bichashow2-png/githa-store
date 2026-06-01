Get-ChildItem -Path . -Recurse -Filter *.html | ForEach-Object {
    $c = Get-Content $_.FullName -Encoding UTF8 -Raw
    
    # Remove old wallet block
    $c = $c -replace '(?s)\s*<a href="#" class="wallet-icon".*?</a>', ''
    
    # Add new wallet icon after cart link
    $wallet = '<a href="#" class="wallet-icon" aria-label="محفظتي" title="محفظتي"><span class="material-icons-outlined">account_balance_wallet</span></a>'
    
    $c = $c -replace '(?s)(<a href="[^"]*cart\.html"[^>]*>.*?</a>)', "`$1`n                $wallet"
    
    $c = $c -replace 'main\.js(\?v=\d+)?', 'main.js?v=4'
    
    Set-Content $_.FullName -Value $c -Encoding UTF8
}
