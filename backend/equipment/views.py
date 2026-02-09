from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from django.views.decorators.csrf import csrf_exempt

import pandas as pd

from .models import EquipmentDataset


# --------------------------------------------------
# CSV UPLOAD API (PUBLIC)
# --------------------------------------------------
@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])  # 👈 OVERRIDES GLOBAL IsAuthenticated
def upload_csv(request):
    print("UPLOAD API HIT")

    file = request.FILES.get('file')

    if not file:
        return Response({"error": "No file uploaded"}, status=400)

    try:
        df = pd.read_csv(file)

        for _, row in df.iterrows():
            EquipmentDataset.objects.create(
                equipment_name=row["Equipment Name"],
                equipment_type=row["Type"],
                flowrate=row["Flowrate"],
                pressure=row["Pressure"],
                temperature=row["Temperature"],
            )

        return Response({
            "message": "CSV uploaded successfully",
            "data": df.to_dict(orient="records")
        })

    except Exception as e:
        return Response({"error": str(e)}, status=500)


# --------------------------------------------------
# UPLOAD HISTORY API (PROTECTED)
# --------------------------------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def upload_history(request):
    data = EquipmentDataset.objects.all().values()
    return Response(list(data))


# --------------------------------------------------
# PDF REPORT API (PROTECTED – STUB)
# --------------------------------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def generate_pdf_report(request):
    return Response({"message": "PDF generation endpoint"})
