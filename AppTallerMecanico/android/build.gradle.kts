// Archivo de nivel raíz: build.gradle.kts

buildscript {
  repositories {
    google()
    mavenCentral()
  }
  dependencies {
    classpath("com.android.tools.build:gradle:8.7.2") // Android Gradle Plugin
    classpath("com.google.gms:google-services:4.4.2") // Google Services plugin
  }
}

// Importa variables adicionales si tienes un archivo variables.gradle
apply(from = "variables.gradle")

// Repositorios comunes para todos los subproyectos
allprojects {
  repositories {
    google()
    mavenCentral()
  }
}

// Tarea para limpiar la carpeta de build
tasks.register<Delete>("clean") {
  delete(rootProject.buildDir)
}
