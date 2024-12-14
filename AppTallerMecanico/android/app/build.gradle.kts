plugins {
  id("com.android.application")
  id("com.google.gms.google-services") // Google Services para Firebase
}

android {
  namespace = "com.app_servi_express.app"
  compileSdk = 34

  defaultConfig {
    applicationId = "com.app_servi_express.app"
    minSdk = 22
    targetSdk = 34
    versionCode = 1
    versionName = "1.0"

    testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
  }

  buildTypes {
    debug {
      isDebuggable = true
    }
    release {
      isMinifyEnabled = false
      proguardFiles(
        getDefaultProguardFile("proguard-android-optimize.txt"),
        "proguard-rules.pro"
      )
    }
  }
}

repositories {
  google()
  mavenCentral()
  flatDir {
    dirs("../capacitor-cordova-android-plugins/src/main/libs", "libs")
  }
}

dependencies {
  // Dependencias locales
  implementation(fileTree(mapOf("include" to listOf("*.jar"), "dir" to "libs")))

  // AndroidX
  implementation("androidx.appcompat:appcompat:1.6.1")
  implementation("androidx.coordinatorlayout:coordinatorlayout:1.2.0")
  implementation("androidx.core:core-splashscreen:1.0.1")

  // Capacitor
  implementation(project(":capacitor-android"))
  implementation(project(":capacitor-cordova-android-plugins"))

  // Firebase (BOM y Analytics)
  implementation(platform("com.google.firebase:firebase-bom:32.7.2"))
  implementation("com.google.firebase:firebase-analytics")

  // Pruebas
  testImplementation("junit:junit:4.13.2")
  androidTestImplementation("androidx.test.ext:junit:1.1.5")
  androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1")
}

// Verificación de google-services.json
if (file("google-services.json").exists()) {
  println("google-services.json encontrado. Aplicando Google Services.")
} else {
  println("google-services.json no encontrado. Push Notifications no funcionarán.")
}
