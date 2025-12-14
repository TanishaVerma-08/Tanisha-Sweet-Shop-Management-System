from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi import Header
from ..database import SessionLocal
from ..dependencies import admin_only
from .. import models, schemas

router = APIRouter(prefix="/api/sweets")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

from fastapi import HTTPException
from .. import schemas, models

@router.post("", response_model=schemas.SweetResponse)
def add_sweet(sweet: schemas.SweetBase, db: Session = Depends(get_db)):
    existing = db.query(models.Sweet).filter(
        models.Sweet.name.ilike(sweet.name)
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Sweet with this name already exists"
        )

    new_sweet = models.Sweet(
        name=sweet.name,
        category=sweet.category,
        price=sweet.price,
        quantity=sweet.quantity
    )

    db.add(new_sweet)
    db.commit()
    db.refresh(new_sweet)

    return {
        "message": "new item added",
        "sweet": new_sweet
    }

@router.get("", response_model=list[schemas.SweetOut])
def list_sweets(db: Session = Depends(get_db)):
    return db.query(models.Sweet).all()

@router.post("/{id}/purchase", response_model=schemas.SweetOut)
def purchase(id: int, db: Session = Depends(get_db)):
    s = db.query(models.Sweet).filter(models.Sweet.id == id).first()
    if not s:
        raise HTTPException(status_code=404, detail="Sweet not found")
    if s.quantity == 0:
        raise HTTPException(status_code=400, detail="Out of stock")

    s.quantity -= 1
    db.commit()
    db.refresh(s)
    return s

def admin_check(is_admin: bool = Header(False)):
    if not is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    
@router.put("/{id}", response_model=schemas.SweetUpdateResponse)
def update_sweet(id: int, sweet: schemas.SweetBase, db: Session = Depends(get_db)):
    existing = db.query(models.Sweet).filter(models.Sweet.id == id).first()
    if not existing:
        raise HTTPException(status_code=404, detail="Sweet not found")

    changes = {}

    if existing.name != sweet.name:
        changes["name"] = {"from": existing.name, "to": sweet.name}
        existing.name = sweet.name

    if existing.category != sweet.category:
        changes["category"] = {"from": existing.category, "to": sweet.category}
        existing.category = sweet.category

    if existing.price != sweet.price:
        changes["price"] = {"from": existing.price, "to": sweet.price}
        existing.price = sweet.price

    if existing.quantity != sweet.quantity:
        changes["quantity"] = {"from": existing.quantity, "to": sweet.quantity}
        existing.quantity = sweet.quantity

    if not changes:
        return {
            "message": "No changes detected",
            "changes": {},
            "updated_sweet": existing
        }

    db.commit()
    db.refresh(existing)

    return {
        "message": "Sweet updated successfully",
        "changes": changes,
        "updated_sweet": existing
    }


@router.delete("/{id}", dependencies=[Depends(admin_only)])
def delete_sweet(id: int, db: Session = Depends(get_db)):
    sweet = db.query(models.Sweet).filter(models.Sweet.id == id).first()
    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")

    db.delete(sweet)
    db.commit()
    return {"message": "Sweet deleted successfully"}

@router.post("/{id}/restock", dependencies=[Depends(admin_only)])
def restock_sweet(id: int, quantity: int, db: Session = Depends(get_db)):
    sweet = db.query(models.Sweet).filter(models.Sweet.id == id).first()
    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")

    sweet.quantity += quantity
    db.commit()
    db.refresh(sweet)
    return sweet
