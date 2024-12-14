# Keep class names for Firebase (prevenir errores de serialización)
-keepattributes *Annotation*
-keep class com.google.firebase.** { *; }
-keep class com.google.android.gms.** { *; }
-keep class com.google.firebase.messaging.** { *; }
-keep class com.google.firebase.analytics.** { *; }

# Prevent warnings for AndroidX libraries
-dontwarn androidx.**

# Keep classes used by Capacitor
-keep class com.getcapacitor.** { *; }
-keep interface com.getcapacitor.** { *; }
-keep class com.getcapacitor.plugin.** { *; }

# Keep classes for WebView with JavaScript interfaces
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Preserve line numbers for debugging
-keepattributes SourceFile,LineNumberTable

# Hide the original source file name
-renamesourcefileattribute SourceFile

# General rules to keep application entry points
-keep public class * extends android.app.Activity
-keep public class * extends android.app.Service
-keep public class * extends android.content.BroadcastReceiver
-keep public class * extends android.content.ContentProvider
-keep public class * extends android.app.Application

# Rules for Retrofit, Gson or JSON parsing (si las usas)
-keep class com.google.gson.** { *; }
-keep class retrofit2.** { *; }
-keep class okhttp3.** { *; }
-keepattributes Signature

# Prevent removal of methods annotated with @Keep
-keep @androidx.annotation.Keep class *
-keepclassmembers class * {
    @androidx.annotation.Keep *;
}

# Avoid issues with reflection (usado en algunas bibliotecas)
-keepclassmembers class * {
    *;
}
