# Generated by Django 3.2.3 on 2022-11-14 17:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecomm', '0008_shippingaddress_state'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='paidAt',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]