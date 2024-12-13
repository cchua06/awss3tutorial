# AWS S3 Tutorial

![AWS S3 Logo](https://miro.medium.com/v2/resize:fit:640/1*B9CIOrxdROHvtdmouQA1_A.png)

Basic guide to setting up a React + Django web app for file uploading and retrieval using AWS S3 buckets.

## Pre-requisites

Must be launched within a Python virtual environment. Download all required packages using **requirements.txt**. All required node modules are outlined in **package.json**.

## Setting up AWS and S3 Bucket

Follow this tutorial to get started with AWS and to set up your first S3 bucket: [AWS Getting Started](https://docs.aws.amazon.com/AmazonS3/latest/userguide/GetStartedWithS3.html). For creating your S3 bucket, fill out the bucket name and then click create bucket.

## Connecting S3 Bucket with Django

Within your Django app (s3_app), navigate to your settings.py. Within it, populate it with the following settings:

```
AWS_ACCESS_KEY_ID = "your-aws-access-key"
AWS_SECRET_ACCESS_KEY = "your-aws-secret-key"
AWS_STORAGE_BUCKET_NAME = "your-s3-bucket-name"
AWS_S3_REGION_NAME = "your-region"
AWS_S3_CUSTOM_DOMAIN = f"{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com"

# File storage settings
DEFAULT_FILE_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"
```

To access your AWS access key ID and secret access key, navigate to your AWS console. Search for "**Users**" and go to the IAM dashboard. Create a new user. Under the new user, select "**Create access key**." Select "**Application running outside AWS**" as your use case. Copy your user's access key ID and secret access key to your settings.py.

## Create IAM User Policy and attach permissions

Navigate to your IAM dashboard. Go to the Policies tab and click "**Create Policy**." Click on JSON then copy the following to your Policy Editor:

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::{YOUR_BUCKET_NAME}",
                "arn:aws:s3:::{YOUR_BUCKET_NAME}/*"
            ]
        }
    ]
}
```

Edit the bucket name to fit your bucket. Navigate to the Users tab in IAM then click on your created user. Click add permissions and "**Attach policies directly**." Search for your policy name and attach it as a permission.

## Frontend

All frontend code is handled by the FileUpload.jsx React component. It utilizes two useStates to handle the file being uploaded and the list of files retrieved from the S3 bucket. Uses Axios to handle dynamic changes to the frontend. The component is utilized in App.jsx

## Backend

Backend components are handled as follows:

### serializers.py

A File serializer utilizes serializer.modelSerializer to handle file uploading.

### models.py

This file defines the schema for the UploadedFile model. file stores the uploaded file, while uploaded_at stores a DateTime object for when the file was uploaded.

### urls.py

Two routes are set up to handle file uploading (upload/) and file retrieval (files/).

### views.py

Two endpoints are defined to handle the routes referenced in urls.py:

- FileUploadView utilizes MultiPartParser and FormParser to handle file uploading. It initializes an AWS S3 client using boto3, then utilizes .upload_fileobj to upload the file to the bucket.
- FileListView retrieves files within the S3 bucket and returns a list object.

## Contact

Cedric Chua - cchua06@sas.upenn.edu

Project Link - https://github.com/cchua06/awss3tutorial