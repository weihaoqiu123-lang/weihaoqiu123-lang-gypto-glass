$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$workspaceRoot = "C:\Users\Administrator\Desktop\CODEX PROJECT\gypto-glass"
$sourceDir = Join-Path "C:\Users\Administrator\Desktop\$([char]0x773c)$([char]0x955c)" "ai$([char]0x773c)$([char]0x955c)$([char]0x56fe)"
$referenceImagePath = "D:\Documents\xwechat_files\wxid_ac81fnuvptdr22_f1e3\temp\RWTemp\2026-04\6d916898510517f8d3076f1dfb51dd7f\73d8de13580b56068b7f1233bc200da3.png"
$outputRoot = Join-Path $workspaceRoot "public\products"

$products = @(
  @{ Source = "1.jpg"; Model = "PR7789 C4"; Slug = "pr7789-c4" },
  @{ Source = "2.jpg"; Model = "PR7795 C8"; Slug = "pr7795-c8" },
  @{ Source = "3.jpg"; Model = "PR7796 C4"; Slug = "pr7796-c4" },
  @{ Source = "4.jpg"; Model = "PR7797 C4"; Slug = "pr7797-c4" },
  @{ Source = "5.jpg"; Model = "PR7798 C1"; Slug = "pr7798-c1" },
  @{ Source = "6.jpg"; Model = "PR7802 C1"; Slug = "pr7802-c1" },
  @{ Source = "7.jpg"; Model = "PR7802 C2"; Slug = "pr7802-c2" },
  @{ Source = "8.jpg"; Model = "PR7782 C3"; Slug = "pr7782-c3" },
  @{ Source = "9.jpg"; Model = "PR7809 C1"; Slug = "pr7809-c1" },
  @{ Source = "10.jpg"; Model = "PR7809 C2"; Slug = "pr7809-c2" }
)

function New-HiQualityGraphics([System.Drawing.Bitmap]$bitmap) {
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  return $graphics
}

function Save-Jpeg([System.Drawing.Bitmap]$bitmap, [string]$path) {
  $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageDecoders() |
    Where-Object { $_.MimeType -eq "image/jpeg" }
  $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
    [System.Drawing.Imaging.Encoder]::Quality,
    [long]92
  )
  $bitmap.Save($path, $encoder, $encoderParams)
  $encoderParams.Dispose()
}

function Crop-Bitmap([System.Drawing.Bitmap]$source, [System.Drawing.Rectangle]$rect) {
  $dest = New-Object System.Drawing.Bitmap($rect.Width, $rect.Height)
  $graphics = New-HiQualityGraphics $dest
  $graphics.DrawImage(
    $source,
    (New-Object System.Drawing.Rectangle(0, 0, $rect.Width, $rect.Height)),
    $rect,
    [System.Drawing.GraphicsUnit]::Pixel
  )
  $graphics.Dispose()
  return $dest
}

function Remove-Background([System.Drawing.Bitmap]$source) {
  $dest = New-Object System.Drawing.Bitmap($source.Width, $source.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

  for ($x = 0; $x -lt $source.Width; $x++) {
    for ($y = 0; $y -lt $source.Height; $y++) {
      $pixel = $source.GetPixel($x, $y)
      $maxChannel = [Math]::Max($pixel.R, [Math]::Max($pixel.G, $pixel.B))
      $minChannel = [Math]::Min($pixel.R, [Math]::Min($pixel.G, $pixel.B))
      $brightness = ($pixel.R + $pixel.G + $pixel.B) / 3
      $range = $maxChannel - $minChannel
      $isBackground = ($brightness -ge 241 -and $range -le 18) -or ($brightness -ge 232 -and $range -le 8)
      if ($isBackground) {
        $dest.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, $pixel.R, $pixel.G, $pixel.B))
      } else {
        $dest.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $pixel.R, $pixel.G, $pixel.B))
      }
    }
  }

  return $dest
}

function Trim-Transparent([System.Drawing.Bitmap]$source) {
  $minX = $source.Width
  $minY = $source.Height
  $maxX = 0
  $maxY = 0

  for ($x = 0; $x -lt $source.Width; $x++) {
    for ($y = 0; $y -lt $source.Height; $y++) {
      $pixel = $source.GetPixel($x, $y)
      if ($pixel.A -gt 0) {
        if ($x -lt $minX) { $minX = $x }
        if ($y -lt $minY) { $minY = $y }
        if ($x -gt $maxX) { $maxX = $x }
        if ($y -gt $maxY) { $maxY = $y }
      }
    }
  }

  if ($minX -ge $maxX -or $minY -ge $maxY) {
    return $source
  }

  $padding = 20
  $rect = New-Object System.Drawing.Rectangle(
    [Math]::Max(0, $minX - $padding),
    [Math]::Max(0, $minY - $padding),
    [Math]::Min($source.Width - [Math]::Max(0, $minX - $padding), ($maxX - $minX) + ($padding * 2)),
    [Math]::Min($source.Height - [Math]::Max(0, $minY - $padding), ($maxY - $minY) + ($padding * 2))
  )

  return Crop-Bitmap $source $rect
}

function Build-LifestylePreview([System.Drawing.Bitmap]$reference, [System.Drawing.Bitmap]$overlay) {
  $canvas = New-Object System.Drawing.Bitmap($reference.Width, $reference.Height)
  $graphics = New-HiQualityGraphics $canvas
  $graphics.DrawImage($reference, 0, 0, $reference.Width, $reference.Height)

  $targetWidth = [int]($reference.Width * 0.40)
  $scale = $targetWidth / $overlay.Width
  $targetHeight = [int]($overlay.Height * $scale)

  $targetX = [int]($reference.Width * 0.295)
  $targetY = [int]($reference.Height * 0.275)

  $colorMatrix = New-Object System.Drawing.Imaging.ColorMatrix
  $attributes = New-Object System.Drawing.Imaging.ImageAttributes
  $attributes.SetColorMatrix($colorMatrix)

  $graphics.DrawImage(
    $overlay,
    (New-Object System.Drawing.Rectangle($targetX, $targetY, $targetWidth, $targetHeight)),
    0,
    0,
    $overlay.Width,
    $overlay.Height,
    [System.Drawing.GraphicsUnit]::Pixel,
    $attributes
  )

  $attributes.Dispose()
  $graphics.Dispose()
  return $canvas
}

if (-not (Test-Path $outputRoot)) {
  New-Item -ItemType Directory -Path $outputRoot | Out-Null
}

$referenceBitmap = [System.Drawing.Bitmap]::FromFile($referenceImagePath)

foreach ($product in $products) {
  $sourcePath = Join-Path $sourceDir $product.Source
  $productDir = Join-Path $outputRoot $product.Slug

  if (-not (Test-Path $productDir)) {
    New-Item -ItemType Directory -Path $productDir | Out-Null
  }

  $bitmap = [System.Drawing.Bitmap]::FromFile($sourcePath)

  $contentHeight = [int]($bitmap.Height * 0.78)
  $segmentHeight = [int]($contentHeight / 3)
  $topPadding = [int]($bitmap.Height * 0.01)
  $middlePadding = [int]($bitmap.Height * 0.01)
  $sidePadding = [int]($bitmap.Height * 0.01)

  $frontRect = [System.Drawing.Rectangle]::new(
    0,
    0,
    [int]$bitmap.Width,
    [int]($segmentHeight - $topPadding)
  )
  $angleRect = [System.Drawing.Rectangle]::new(
    0,
    [int]($segmentHeight + $middlePadding),
    [int]$bitmap.Width,
    [int]($segmentHeight - ($middlePadding * 2))
  )
  $sideRect = [System.Drawing.Rectangle]::new(
    0,
    [int](($segmentHeight * 2) + $sidePadding),
    [int]$bitmap.Width,
    [int]($segmentHeight - ($sidePadding * 2))
  )

  $front = Crop-Bitmap $bitmap $frontRect
  $angle = Crop-Bitmap $bitmap $angleRect
  $side = Crop-Bitmap $bitmap $sideRect

  Save-Jpeg $front (Join-Path $productDir "front.jpg")
  Save-Jpeg $angle (Join-Path $productDir "angle.jpg")
  Save-Jpeg $side (Join-Path $productDir "side.jpg")

  $overlay = Remove-Background $front
  $trimmedOverlay = Trim-Transparent $overlay
  $trimmedOverlay.Save((Join-Path $productDir "overlay.png"), [System.Drawing.Imaging.ImageFormat]::Png)

  $lifestyle = Build-LifestylePreview $referenceBitmap $trimmedOverlay
  Save-Jpeg $lifestyle (Join-Path $productDir "lifestyle.jpg")

  $front.Dispose()
  $angle.Dispose()
  $side.Dispose()
  $overlay.Dispose()
  if ($trimmedOverlay -ne $overlay) {
    $trimmedOverlay.Dispose()
  }
  $lifestyle.Dispose()
  $bitmap.Dispose()
}

$referenceBitmap.Dispose()
