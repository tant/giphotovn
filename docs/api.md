ENJOY SPORT
PHOTOS API DOCUMENT

1. Events:
GET https://photos.enjoysport.vn/api/events

Request:

Header:
Authorization
string
Required
Bearer {access_token}


Params:
Parameters
Type
Mandatory (Y/N)
Description
limit
int
N
The size of one page. Max 100. Default 10.
search
string
N
Name


Response:
{
  "current_page": 1,
  "data": [
    {
      "event_name": "HO CHI MINH CITY NIGHT RUN EXIMBANK 2024",
      "slug": "ho-chi-minh-city-night-run-eximbank",
      "province": "Thành phố Hồ Chí Minh",
      "event_date": "2024-05-18",
      "banner_image": "k6yeTqkS.jpg",
      "thumbnail": "https://hcm03.vstorage.vngcloud.vn/v1/AUTH_63bc1636b6fd456893cd154b1d53ded7/img/event/k6yeTqkS_thumb.jpg",
      "categories": []
    }
  ],
  "from": 1,
  "last_page": 1,
  "per_page": 20,
  "to": 1,
  "total": 1
}

2. Photos:
POST https://photos.enjoysport.vn/api/photos

Request:

Header:
content-type
string
Required
Allowed type: multipart/form-data
Authorization
string
Required
Bearer {access_token}


Body:
Parameters
Type
Mandatory (Y/N)
Description
slug
string
Y
Event slug
limit
int
N
The size of one page. Max 100. Default 50.
search
string
N
Bib number
image
file
N
Face image


Response:

{
  "current_page": 1,
  "data": [
    {
      "photo_id": 3018847,
      "filename": "cc7c0f8c1e6013a330bb663fd75629dc.jpg",
      "thumb_url": "https://storage.enjoysport.asia/2025-chinhphucdinhcaobara/thumb/cc7c0f8c1e6013a330bb663fd75629dc.jpg",
      "photo_url": "https://storage.enjoysport.asia/2025-chinhphucdinhcaobara/photo/cc7c0f8c1e6013a330bb663fd75629dc.jpg"
    }
  ],
  "from": 1,
  "last_page": 4264,
  "per_page": 1,
  "to": 1,
  "total": 4264
}

