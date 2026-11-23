"""API request/response models. This file is the source of truth for docs/API_CONTRACT.md."""
from typing import List, Optional

from pydantic import BaseModel, Field, field_validator

from .config import MAX_TEXT_LENGTH, MAX_URL_LENGTH


class TextScanRequest(BaseModel):
    text: str = Field(..., max_length=MAX_TEXT_LENGTH)

    @field_validator("text")
    @classmethod
    def not_blank(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("text must not be empty")
        return v


class UrlScanRequest(BaseModel):
    url: str = Field(..., max_length=MAX_URL_LENGTH)

    @field_validator("url")
    @classmethod
    def not_blank(cls, v: str) -> str:
        if len(v.strip()) < 3:
            raise ValueError("url is too short")
        return v


class Risk(BaseModel):
    score: int
    band: str
    label: str
    breakdown: dict
    disclaimer: str


class ScamType(BaseModel):
    id: str
    label: str


class IndicatorOut(BaseModel):
    id: str
    label: str
    weight: int
    evidence: List[str]


class UrlFlag(BaseModel):
    id: str
    label: str
    weight: int


class UrlOut(BaseModel):
    url: str
    host: str
    registered_domain: str
    verdict: str
    score: int
    flags: List[UrlFlag]
    official_domain_match: bool
    reputation_checked: bool
    note: str


class Span(BaseModel):
    start: int
    end: int
    kind: str
    id: str


class Explanation(BaseModel):
    text: str
    source: str


class Action(BaseModel):
    en: str
    te: Optional[str] = None


class ScanResponse(BaseModel):
    scan_id: str
    input_type: str
    text: str
    language: str
    risk: Risk
    scam_type: Optional[ScamType] = None
    indicators: List[IndicatorOut]
    urls: List[UrlOut]
    spans: List[Span]
    explanation: Explanation
    actions: List[Action]
    helplines: dict
    ml_used: bool


class Example(BaseModel):
    id: str
    title: str
    text: str
