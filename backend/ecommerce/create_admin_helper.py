import os
import sys
import django

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce.settings')
django.setup()

from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.contrib.auth.hashers import make_password

def create_admin():
    User = get_user_model()
    
    email = input("Enter Admin Email: ").strip()
    username = input("Enter Admin Username: ").strip()
    password = input("Enter Admin Password: ").strip()
    phone_number = input("Enter Phone Number: ").strip()
    
    if not all([email, username, password, phone_number]):
        print("Error: All fields are required.")
        return
        
    if User.objects.filter(email=email).exists():
        print(f"Error: User with email {email} already exists.")
        return
        
    try:
        user = User.objects.create(
            email=email,
            username=username,
            password=make_password(password),
            phone_number=phone_number,
            is_staff=True,
            is_superuser=True,
            is_admin_staff=True
        )
        
        # Add user to 'Admin' group (required by the login API view checks)
        admin_group, _ = Group.objects.get_or_create(name='Admin')
        user.groups.add(admin_group)
        
        print(f"\nSuccess! Admin user created successfully:\nEmail: {email}\nUsername: {username}")
    except Exception as e:
        print(f"Error creating admin: {e}")

if __name__ == '__main__':
    create_admin()
