from pathlib import Path
from datetime import timedelta

BASE_DIR = Path(__file__).resolve().parent.parent

DEBUG = True
SECRET_KEY = 'django-insecure-!2v3$x@9=0uq*bb#myda5gujb!h!l!j)2^jwf$i^p%v-!gt!c_'

ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'corsheaders',

    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'axes',

    'core',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',

    'corsheaders.middleware.CorsMiddleware',

    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    'axes.middleware.AxesMiddleware',
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'OPTIONS': {
            'options': '-c search_path=authentication'
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
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
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

AUTHENTICATION_BACKENDS = [
    'axes.backends.AxesStandaloneBackend',
    'django.contrib.auth.backends.ModelBackend',
]
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',},
]

ROOT_URLCONF = 'authentication.urls'
WSGI_APPLICATION = 'authentication.wsgi.application'

USE_TZ = True
TIME_ZONE = 'UTC'
LANGUAGE_CODE = 'en-us'
USE_I18N = True

STATIC_URL = 'static/'

ATOMIC_REQUESTS = True
SILENCED_SYSTEM_CHECKS = ['axes.W003']

# RSA512 Key Pairs
PRIVATE_KEY = """-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----"""
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

# django-axes
AXES_COOLOFF_TIME	= 1
AXES_LOCK_OUT_BY_COMBINATION_USER_AND_IP = True
AXES_USE_USER_AGENT = True
AXES_LOCKOUT_URL = "core:api/axes/lockout"
AXES_VERBOSE = True
AXES_ACCESS_FAILURE_LOG_PER_USER_LIMIT = 10
AXES_RESET_ON_SUCCESS = True
AXES_ALLOWED_CORS_ORIGINS = CORS_ALLOWED_ORIGINS
AXES_HTTP_RESPONSE_CODE = 403
AXES_RESET_COOL_OFF_ON_FAILURE_DURING_LOCKOUT = True


# django-simplejwt
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': True,

    'ALGORITHM': 'RS512',
    'SIGNING_KEY': PRIVATE_KEY,
    'VERIFYING_KEY': PUBLIC_KEY,
    'AUDIENCE': 'accio.aagamsheth.com',
    'ISSUER': None,
    'JWK_URL': None,
    'LEEWAY': 0,

    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    'TOKEN_USER_CLASS': 'rest_framework_simplejwt.models.TokenUser',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}
