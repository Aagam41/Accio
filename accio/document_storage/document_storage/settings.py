from pathlib import Path
from datetime import timedelta

BASE_DIR = Path(__file__).resolve().parent.parent

DEBUG = True
SECRET_KEY = 'django-insecure-!2v3$x@9=0uq*bb#myda5gujb!h!l!j)2^jwf$i^p%v-!gt!c_'

ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.staticfiles',

    'corsheaders',

    'rest_framework',
    'rest_framework_simplejwt',

    'core',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',

    'corsheaders.middleware.CorsMiddleware',
    'csp.middleware.CSPMiddleware',

    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [],
        },
    },
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'OPTIONS': {
            'options': '-c search_path=document_storage'
        },
        'NAME': 'accio',
        'USER': 'postgres',
        'PASSWORD': 'Postgres@123',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
    'UNAUTHENTICATED_USER': None,
    'DEFAULT_AUTHENTICATION_CLASSES': ('rest_framework_simplejwt.authentication.JWTStatelessUserAuthentication',),
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ),
    'DEFAULT_PARSER_CLASSES': (
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.FormParser',
        'rest_framework.parsers.MultiPartParser'
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated'
    ),
}

ROOT_URLCONF = 'document_storage.urls'
WSGI_APPLICATION = 'document_storage.wsgi.application'

USE_TZ = True
TIME_ZONE = 'UTC'
LANGUAGE_CODE = 'en-us'
USE_I18N = True

STATIC_URL = 'static/'

MEDIA_URL = 'media/'
MEDIA_ROOT = "/home/aagam41/Development/Accio/uploads/"

ATOMIC_REQUESTS = True

PUBLIC_KEY = """-----BEGIN PUBLIC KEY-----
MIICITANBgkqhkiG9w0BAQEFAAOCAg4AMIICCQKCAgBJmfjVy9E7AC0PU/+bjepT
yggvYqaGMvh/xJgZMtT525YcnbRcwtnYqFQBg/MvCpoQ6V6J1HJ1Sg8QX4ZZ2hSq
6iVKE6n94+2zE7qJITscnFqcKtH75ZpBLob9dbBH8P/llgZxqkK0YE0E2keBulCg
EdvJk4vSbZeYNOyJD4nKaI3fhkm3uTDsbos3FC70l1gSn93V9xsTzwCI5ynjevki
0JmWEA3ZMarArhVePXFzIVpb+maGL4521U7cBohXTyQQrUuwYksAEwu1W6zxgYoL
hoooArPOkJ/YP7nAGS2eTKnluJ1VlB5s+QHB7P76q/+A939IhyRjxsmXGASriro6
MO3e+fcy4sa2MrcYZXqFrpn9GK9YvJGYxU/wofLH5ThdDOTL+5b2YM4+/2vN2clf
B2uu22FpAztEGpHm0eNK2EHmaOM786Nob86m5RuzzPbBIKdShFevzwQLTuYYZTgj
mM+Y1L/t2DHNJf2b3VQRmvlqeqvD9lgvKSCyC8slNeRSqR+dIYOpHV12nX5vTduP
zR8lkZZNFjIEZ4dScndlziYzrjob+A/R4VqW1bi5JGZs2BFe6Z61IDcxPwnYvNaI
nOSt0zYthKipzXvGWRMBsTbI9XY2N6G5Q9cNL5CnND7CysinF5mgalCjM7RjruGT
8WT64zoBOMg9hKzTU3XLhwIDAQAB
-----END PUBLIC KEY-----"""

# django-cors-headers
CORS_ALLOWED_ORIGINS = [
    "http://localhost:8000",
    "http://localhost:3000",
]

# django-simplejwt
SIMPLE_JWT = {
    'ALGORITHM': 'RS512',
    'VERIFYING_KEY': PUBLIC_KEY,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
}
