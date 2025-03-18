# Create the sounds directory if it doesn't exist
New-Item -ItemType Directory -Force -Path "sounds"

# Create a WebClient object
$webClient = New-Object System.Net.WebClient
$webClient.Headers.Add("User-Agent", "Mozilla/5.0")

# Download critical alert sound (high urgency)
$criticalUrl = "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"
$criticalPath = "sounds/critical-alert.mp3"
$webClient.DownloadFile($criticalUrl, $criticalPath)
Write-Host "Critical alert sound downloaded to: $criticalPath"

# Download important alert sound (medium urgency)
$importantUrl = "https://assets.mixkit.co/active_storage/sfx/2866/2866-preview.mp3"
$importantPath = "sounds/important-alert.mp3"
$webClient.DownloadFile($importantUrl, $importantPath)
Write-Host "Important alert sound downloaded to: $importantPath"

# Download regular alert sound (normal urgency)
$normalUrl = "https://assets.mixkit.co/active_storage/sfx/2867/2867-preview.mp3"
$normalPath = "sounds/alert.mp3"
$webClient.DownloadFile($normalUrl, $normalPath)
Write-Host "Normal alert sound downloaded to: $normalPath" 