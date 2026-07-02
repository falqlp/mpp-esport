import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { EsportsApiService } from '../services/esports-api.service';
import { EsportsDataService } from '../services/esports-data.service';
import { AuthService } from '../services/auth.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/material/button";
import * as i3 from "@angular/material/card";
import * as i4 from "@angular/material/chips";
import * as i5 from "@angular/material/form-field";
import * as i6 from "@angular/material/input";
import * as i7 from "@angular/material/list";
import * as i8 from "@angular/material/select";
import * as i9 from "@angular/material/toolbar";
const _forTrack0 = ($index, $item) => $item.value;
const _forTrack1 = ($index, $item) => $item.id;
const _forTrack2 = ($index, $item) => $item.prediction.id;
const _forTrack3 = ($index, $item) => $item.playerName;
function AppComponent_Conditional_0_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-card", 5)(1, "mat-card-content")(2, "span")(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "small");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "button", 10);
    i0.ɵɵlistener("click", function AppComponent_Conditional_0_Conditional_10_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.logout()); });
    i0.ɵɵtext(8, "Se d\u00E9connecter");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const user_r3 = ctx;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(user_r3.displayName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(user_r3.email);
} }
function AppComponent_Conditional_0_Conditional_12_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-form-field", 12)(1, "mat-label");
    i0.ɵɵtext(2, "Nom affich\u00E9");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "input", 17);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(3);
    i0.ɵɵcontrol();
} }
function AppComponent_Conditional_0_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-card", 6)(1, "mat-card-header")(2, "mat-card-subtitle", 3);
    i0.ɵɵtext(3, "Compte joueur");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "mat-card-title");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "mat-card-content")(7, "form", 11);
    i0.ɵɵlistener("ngSubmit", function AppComponent_Conditional_0_Conditional_12_Template_form_ngSubmit_7_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.submitAuth()); });
    i0.ɵɵelementStart(8, "mat-form-field", 12)(9, "mat-label");
    i0.ɵɵtext(10, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(11, "input", 13);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(12, AppComponent_Conditional_0_Conditional_12_Conditional_12_Template, 4, 0, "mat-form-field", 12);
    i0.ɵɵelementStart(13, "mat-form-field", 12)(14, "mat-label");
    i0.ɵɵtext(15, "Mot de passe");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(16, "input", 14);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "button", 15);
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "button", 16);
    i0.ɵɵlistener("click", function AppComponent_Conditional_0_Conditional_12_Template_button_click_19_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.authMode = ctx_r1.authMode === "login" ? "register" : "login"); });
    i0.ɵɵtext(20);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r1.authMode === "login" ? "Connexion" : "Cr\u00E9er un compte");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("formGroup", ctx_r1.authForm);
    i0.ɵɵadvance(4);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.authMode === "register" ? 12 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵcontrol();
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.isAuthenticating);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r1.isAuthenticating ? "Patiente\u2026" : ctx_r1.authMode === "login" ? "Se connecter" : "S'inscrire", " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.authMode === "login" ? "Cr\u00E9er un compte" : "J'ai d\u00E9j\u00E0 un compte", " ");
} }
function AppComponent_Conditional_0_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-card", 7)(1, "mat-card-content");
    i0.ɵɵelement(2, "span", 18);
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Chargement des donn\u00E9es esport\u2026");
    i0.ɵɵelementEnd()()();
} }
function AppComponent_Conditional_0_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-card", 8)(1, "mat-card-content")(2, "span", 19);
    i0.ɵɵtext(3, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "button", 10);
    i0.ɵɵlistener("click", function AppComponent_Conditional_0_Conditional_14_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.retry()); });
    i0.ɵɵtext(7, "R\u00E9essayer");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const state_r6 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(state_r6.message);
} }
function AppComponent_Conditional_0_Conditional_15_For_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 24);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const competition_r8 = ctx.$implicit;
    i0.ɵɵproperty("value", competition_r8.value);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(competition_r8.label);
} }
function AppComponent_Conditional_0_Conditional_15_For_21_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 48);
} if (rf & 2) {
    const match_r10 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("src", ctx, i0.ɵɵsanitizeUrl)("alt", match_r10.teams[0].name);
} }
function AppComponent_Conditional_0_Conditional_15_For_21_Conditional_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const match_r10 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" ", match_r10.teams[0].code, " ");
} }
function AppComponent_Conditional_0_Conditional_15_For_21_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 48);
} if (rf & 2) {
    const match_r10 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("src", ctx, i0.ɵɵsanitizeUrl)("alt", match_r10.teams[1].name);
} }
function AppComponent_Conditional_0_Conditional_15_For_21_Conditional_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const match_r10 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" ", match_r10.teams[1].code, " ");
} }
function AppComponent_Conditional_0_Conditional_15_For_21_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 44);
    i0.ɵɵlistener("click", function AppComponent_Conditional_0_Conditional_15_For_21_Template_button_click_0_listener() { const match_r10 = i0.ɵɵrestoreView(_r9).$implicit; const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.selectMatch(match_r10)); });
    i0.ɵɵelementStart(1, "span", 45)(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "small");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "span", 46)(7, "span", 47);
    i0.ɵɵconditionalCreate(8, AppComponent_Conditional_0_Conditional_15_For_21_Conditional_8_Template, 1, 2, "img", 48)(9, AppComponent_Conditional_0_Conditional_15_For_21_Conditional_9_Template, 1, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "span", 49);
    i0.ɵɵtext(11, "VS");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span", 47);
    i0.ɵɵconditionalCreate(13, AppComponent_Conditional_0_Conditional_15_For_21_Conditional_13_Template, 1, 2, "img", 48)(14, AppComponent_Conditional_0_Conditional_15_For_21_Conditional_14_Template, 1, 1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "time");
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "span", 50);
    i0.ɵɵtext(19, "\u203A");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    let tmp_17_0;
    let tmp_20_0;
    const match_r10 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(match_r10.league);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", match_r10.tournament, " \u00B7 ", match_r10.format);
    i0.ɵɵadvance(2);
    i0.ɵɵstyleProp("--team-color", match_r10.teams[0].logoColor);
    i0.ɵɵclassProp("has-logo", match_r10.teams[0].logoUrl);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_17_0 = match_r10.teams[0].logoUrl) ? 8 : 9, tmp_17_0);
    i0.ɵɵadvance(4);
    i0.ɵɵstyleProp("--team-color", match_r10.teams[1].logoColor);
    i0.ɵɵclassProp("has-logo", match_r10.teams[1].logoUrl);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_20_0 = match_r10.teams[1].logoUrl) ? 13 : 14, tmp_20_0);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(17, 14, match_r10.startsAt, "EEE d MMM, HH:mm"));
} }
function AppComponent_Conditional_0_Conditional_15_For_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 24);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const match_r11 = ctx.$implicit;
    i0.ɵɵproperty("value", match_r11.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", match_r11.teams[0].code, " vs ", match_r11.teams[1].code);
} }
function AppComponent_Conditional_0_Conditional_15_Conditional_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33)(1, "mat-form-field", 12)(2, "mat-label");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "input", 51);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "mat-form-field", 12)(6, "mat-label");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(8, "input", 52);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const match_r12 = ctx;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(match_r12.teams[0].name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("max", match_r12.format === "BO1" ? 1 : match_r12.format === "BO3" ? 2 : 3);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(match_r12.teams[1].name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("max", match_r12.format === "BO1" ? 1 : match_r12.format === "BO3" ? 2 : 3);
    i0.ɵɵcontrol();
} }
function AppComponent_Conditional_0_Conditional_15_Conditional_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 34);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.scoreErrorMessage());
} }
function AppComponent_Conditional_0_Conditional_15_For_57_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 38)(1, "span")(2, "strong");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "small");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "strong", 53);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r13 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", item_r13.match.teams[0].code, " vs ", item_r13.match.teams[1].code);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", item_r13.match.league, " \u00B7 ", i0.ɵɵpipeBind2(6, 6, item_r13.match.startsAt, "EEE d MMM, HH:mm"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", item_r13.prediction.score[0], " \u2013 ", item_r13.prediction.score[1]);
} }
function AppComponent_Conditional_0_Conditional_15_ForEmpty_58_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 39);
    i0.ɵɵtext(1, "Aucun pronostic \u00E0 venir pour ce pseudo.");
    i0.ɵɵelementEnd();
} }
function AppComponent_Conditional_0_Conditional_15_For_68_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-list-item")(1, "span", 54);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong", 55);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 56);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const player_r14 = ctx.$implicit;
    const ɵ$index_285_r15 = ctx.$index;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ɵ$index_285_r15 + 1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(player_r14.playerName);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", player_r14.points, " pts");
} }
function AppComponent_Conditional_0_Conditional_15_For_77_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-card", 43)(1, "mat-card-subtitle");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "mat-card-title");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "mat-card-content");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const match_r16 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(match_r16.league);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate4("", match_r16.teams[0].code, " ", match_r16.result?.score?.[0], " \u2013 ", match_r16.result?.score?.[1], " ", match_r16.teams[1].code);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("Vainqueur : ", ctx_r1.teamName(match_r16, match_r16.result?.winnerId ?? ""));
} }
function AppComponent_Conditional_0_Conditional_15_Conditional_78_Conditional_0_For_8_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 61);
} if (rf & 2) {
    const team_r17 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("src", ctx, i0.ɵɵsanitizeUrl)("alt", team_r17.name);
} }
function AppComponent_Conditional_0_Conditional_15_Conditional_78_Conditional_0_For_8_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
} if (rf & 2) {
    const team_r17 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵtextInterpolate1(" ", team_r17.code, " ");
} }
function AppComponent_Conditional_0_Conditional_15_Conditional_78_Conditional_0_For_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 59)(1, "span", 60);
    i0.ɵɵconditionalCreate(2, AppComponent_Conditional_0_Conditional_15_Conditional_78_Conditional_0_For_8_Conditional_2_Template, 1, 2, "img", 61)(3, AppComponent_Conditional_0_Conditional_15_Conditional_78_Conditional_0_For_8_Conditional_3_Template, 1, 1);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span")(5, "strong");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "small");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_17_0;
    const team_r17 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵstyleProp("--team-color", team_r17.logoColor);
    i0.ɵɵadvance();
    i0.ɵɵconditional((tmp_17_0 = team_r17.logoUrl) ? 2 : 3, tmp_17_0);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(team_r17.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(team_r17.code);
} }
function AppComponent_Conditional_0_Conditional_15_Conditional_78_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-card", 57)(1, "mat-card-header")(2, "mat-card-subtitle", 3);
    i0.ɵɵtext(3, "R\u00E9gions majeures");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "mat-card-title");
    i0.ɵɵtext(5, "\u00C9quipes LCS \u00B7 LEC \u00B7 LCK \u00B7 LPL");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "mat-card-content", 58);
    i0.ɵɵrepeaterCreate(7, AppComponent_Conditional_0_Conditional_15_Conditional_78_Conditional_0_For_8_Template, 9, 5, "article", 59, _forTrack1);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const teams_r18 = i0.ɵɵnextContext();
    i0.ɵɵadvance(7);
    i0.ɵɵrepeater(teams_r18);
} }
function AppComponent_Conditional_0_Conditional_15_Conditional_78_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵconditionalCreate(0, AppComponent_Conditional_0_Conditional_15_Conditional_78_Conditional_0_Template, 9, 0, "mat-card", 57);
} if (rf & 2) {
    i0.ɵɵconditional(ctx.length ? 0 : -1);
} }
function AppComponent_Conditional_0_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "section", 9)(1, "mat-card", 20)(2, "mat-form-field", 21)(3, "mat-label");
    i0.ɵɵtext(4, "Comp\u00E9tition");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "mat-select", 22)(6, "mat-option", 23);
    i0.ɵɵtext(7, "Toutes les comp\u00E9titions");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(8, AppComponent_Conditional_0_Conditional_15_For_9_Template, 2, 2, "mat-option", 24, _forTrack0);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "mat-card", 25)(11, "mat-card-header")(12, "mat-card-title-group")(13, "mat-card-subtitle", 3);
    i0.ɵɵtext(14, "\u00C0 venir");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "mat-card-title");
    i0.ɵɵtext(16, "Matchs ouverts aux pronos");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "mat-chip");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(19, "mat-card-content", 26);
    i0.ɵɵrepeaterCreate(20, AppComponent_Conditional_0_Conditional_15_For_21_Template, 20, 17, "button", 27, _forTrack1);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "mat-card", 28)(23, "mat-card-header")(24, "mat-card-subtitle", 3);
    i0.ɵɵtext(25, "Prono");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "mat-card-title");
    i0.ɵɵtext(27, "Ton ticket");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(28, "mat-card-content")(29, "form", 29);
    i0.ɵɵlistener("ngSubmit", function AppComponent_Conditional_0_Conditional_15_Template_form_ngSubmit_29_listener() { i0.ɵɵrestoreView(_r7); const state_r6 = i0.ɵɵnextContext(); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submitPrediction(state_r6.data.matches)); });
    i0.ɵɵelementStart(30, "mat-form-field", 12)(31, "mat-label");
    i0.ɵɵtext(32, "Pseudo");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(33, "input", 30);
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementStart(34, "mat-error");
    i0.ɵɵtext(35, "Entre au moins 2 caract\u00E8res.");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(36, "mat-form-field", 12)(37, "mat-label");
    i0.ɵɵtext(38, "Match");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "mat-select", 31)(40, "mat-option", 32);
    i0.ɵɵtext(41, "Choisir un match");
    i0.ɵɵelementEnd();
    i0.ɵɵrepeaterCreate(42, AppComponent_Conditional_0_Conditional_15_For_43_Template, 2, 3, "mat-option", 24, _forTrack1);
    i0.ɵɵelementEnd();
    i0.ɵɵcontrolCreate();
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(44, AppComponent_Conditional_0_Conditional_15_Conditional_44_Template, 9, 4, "div", 33);
    i0.ɵɵconditionalCreate(45, AppComponent_Conditional_0_Conditional_15_Conditional_45_Template, 2, 1, "p", 34);
    i0.ɵɵelementStart(46, "button", 35);
    i0.ɵɵpipe(47, "async");
    i0.ɵɵtext(48);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(49, "mat-card", 36)(50, "mat-card-header")(51, "mat-card-subtitle", 3);
    i0.ɵɵtext(52, "Mes pronostics");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(53, "mat-card-title");
    i0.ɵɵtext(54, "Matchs \u00E0 venir");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(55, "mat-card-content", 37);
    i0.ɵɵrepeaterCreate(56, AppComponent_Conditional_0_Conditional_15_For_57_Template, 9, 9, "article", 38, _forTrack2, false, AppComponent_Conditional_0_Conditional_15_ForEmpty_58_Template, 2, 0, "p", 39);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(59, "mat-card", 40)(60, "mat-card-header")(61, "mat-card-subtitle", 3);
    i0.ɵɵtext(62, "Ligue priv\u00E9e");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(63, "mat-card-title");
    i0.ɵɵtext(64, "Classement");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(65, "mat-card-content")(66, "mat-list", 41);
    i0.ɵɵrepeaterCreate(67, AppComponent_Conditional_0_Conditional_15_For_68_Template, 7, 3, "mat-list-item", null, _forTrack3);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(69, "mat-card", 25)(70, "mat-card-header")(71, "mat-card-subtitle", 3);
    i0.ɵɵtext(72, "R\u00E9sultats");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(73, "mat-card-title");
    i0.ɵɵtext(74, "Matchs termin\u00E9s");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(75, "mat-card-content", 42);
    i0.ɵɵrepeaterCreate(76, AppComponent_Conditional_0_Conditional_15_For_77_Template, 7, 6, "mat-card", 43, _forTrack1);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(78, AppComponent_Conditional_0_Conditional_15_Conditional_78_Template, 1, 1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_12_0;
    let tmp_19_0;
    const state_r6 = i0.ɵɵnextContext();
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("formControl", ctx_r1.competitionControl);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.competitions(state_r6.data.matches));
    i0.ɵɵadvance(10);
    i0.ɵɵtextInterpolate1("", ctx_r1.filteredMatches(state_r6.data.upcomingMatches).length, " matchs");
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.filteredMatches(state_r6.data.upcomingMatches));
    i0.ɵɵadvance(9);
    i0.ɵɵproperty("formGroup", ctx_r1.form);
    i0.ɵɵadvance(4);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(6);
    i0.ɵɵcontrol();
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r1.filteredMatches(state_r6.data.upcomingMatches));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_12_0 = ctx_r1.selectedMatch()) ? 44 : -1, tmp_12_0);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.scoreErrorMessage() && (ctx_r1.form.controls.scoreA.dirty || ctx_r1.form.controls.scoreB.dirty || ctx_r1.form.controls.scoreA.touched || ctx_r1.form.controls.scoreB.touched) ? 45 : -1);
    i0.ɵɵadvance();
    i0.ɵɵproperty("disabled", ctx_r1.isSaving || !i0.ɵɵpipeBind1(47, 9, ctx_r1.user$));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.isSaving ? "Enregistrement\u2026" : "Valider le prono", " ");
    i0.ɵɵadvance(8);
    i0.ɵɵrepeater(ctx_r1.upcomingPredictions(state_r6.data.matches, state_r6.data.predictions));
    i0.ɵɵadvance(11);
    i0.ɵɵrepeater(state_r6.data.leaderboard);
    i0.ɵɵadvance(9);
    i0.ɵɵrepeater(ctx_r1.filteredMatches(state_r6.data.finishedMatches));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_19_0 = ctx_r1.majorTeams(state_r6.data.matches)) ? 78 : -1, tmp_19_0);
} }
function AppComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "main", 0)(1, "mat-toolbar", 1)(2, "div", 2)(3, "span", 3);
    i0.ɵɵtext(4, "League of Legends");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "h1");
    i0.ɵɵtext(6, "MPP Esport");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(7, "span", 4);
    i0.ɵɵelementStart(8, "mat-chip");
    i0.ɵɵtext(9, "V1 Summer Split");
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(10, AppComponent_Conditional_0_Conditional_10_Template, 9, 2, "mat-card", 5);
    i0.ɵɵpipe(11, "async");
    i0.ɵɵconditionalBranchCreate(12, AppComponent_Conditional_0_Conditional_12_Template, 21, 6, "mat-card", 6);
    i0.ɵɵconditionalCreate(13, AppComponent_Conditional_0_Conditional_13_Template, 5, 0, "mat-card", 7);
    i0.ɵɵconditionalCreate(14, AppComponent_Conditional_0_Conditional_14_Template, 8, 1, "mat-card", 8);
    i0.ɵɵconditionalCreate(15, AppComponent_Conditional_0_Conditional_15_Template, 79, 11, "section", 9);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    let tmp_2_0;
    const state_r6 = ctx;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(10);
    i0.ɵɵconditional((tmp_2_0 = i0.ɵɵpipeBind1(11, 4, ctx_r1.user$)) ? 10 : 12, tmp_2_0);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional(state_r6.status === "loading" ? 13 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(state_r6.status === "error" ? 14 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(state_r6.status === "ready" ? 15 : -1);
} }
export class AppComponent {
    constructor() {
        this.api = inject(EsportsApiService);
        this.dataService = inject(EsportsDataService);
        this.destroyRef = inject(DestroyRef);
        this.fb = inject(FormBuilder);
        this.snackBar = inject(MatSnackBar);
        this.auth = inject(AuthService);
        this.matches = [];
        this.predictions = [];
        this.state$ = this.dataService.state$;
        this.user$ = this.auth.user$;
        this.competitionControl = new FormControl('all', { nonNullable: true });
        this.isSaving = false;
        this.authMode = 'login';
        this.isAuthenticating = false;
        this.authForm = this.fb.nonNullable.group({
            email: ['', [Validators.required, Validators.email]],
            displayName: ['', [Validators.minLength(2)]],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });
        this.matchScoreValidator = (control) => {
            const match = this.matches.find(({ id }) => id === control.get('matchId')?.value);
            const scoreA = Number(control.get('scoreA')?.value);
            const scoreB = Number(control.get('scoreB')?.value);
            if (!match || !Number.isInteger(scoreA) || !Number.isInteger(scoreB))
                return null;
            const winsRequired = this.winsRequired(match);
            if (scoreA < 0 || scoreB < 0 || scoreA > winsRequired || scoreB > winsRequired)
                return { scoreOutOfRange: true };
            return scoreA === scoreB || Math.max(scoreA, scoreB) !== winsRequired ? { invalidSeriesScore: true } : null;
        };
        this.form = this.fb.nonNullable.group({
            playerName: ['Leo', [Validators.required, Validators.minLength(2)]],
            matchId: ['', Validators.required],
            scoreA: [2, [Validators.required, Validators.min(0), Validators.max(3)]],
            scoreB: [1, [Validators.required, Validators.min(0), Validators.max(3)]],
        }, { validators: this.matchScoreValidator });
    }
    ngOnInit() {
        this.user$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((user) => {
            if (user)
                this.form.controls.playerName.setValue(user.displayName);
        });
        this.state$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(({ status, data }) => {
            if (status !== 'ready')
                return;
            this.matches = data.matches;
            this.predictions = data.predictions;
            this.loadPrediction(this.form.controls.matchId.value);
            this.form.updateValueAndValidity({ emitEvent: false });
        });
        this.form.controls.matchId.valueChanges.pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
            .subscribe((id) => this.loadPrediction(id));
        this.form.controls.playerName.valueChanges.pipe(debounceTime(200), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.loadPrediction(this.form.controls.matchId.value));
        this.competitionControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((competition) => {
            const selected = this.selectedMatch();
            if (selected && !this.matchesCompetition(selected, competition))
                this.form.controls.matchId.setValue('');
        });
    }
    retry() { this.dataService.reload(); }
    submitAuth() {
        if (this.authForm.invalid || this.isAuthenticating) {
            this.authForm.markAllAsTouched();
            return;
        }
        const { email, displayName, password } = this.authForm.getRawValue();
        this.isAuthenticating = true;
        const request = this.authMode === 'login' ? this.auth.login(email, password) : this.auth.register(email, displayName, password);
        request.pipe(finalize(() => { this.isAuthenticating = false; }), takeUntilDestroyed(this.destroyRef)).subscribe({
            next: ({ user }) => {
                this.form.controls.playerName.setValue(user.displayName);
                this.dataService.reload();
                this.snackBar.open(`Bienvenue ${user.displayName} !`, 'Fermer', { duration: 3000 });
            },
            error: () => this.snackBar.open('Connexion impossible. Vérifie les informations saisies.', 'Fermer', { duration: 4000 }),
        });
    }
    logout() { this.auth.logout(); this.dataService.reload(); }
    selectMatch(match) { this.form.controls.matchId.setValue(match.id); }
    submitPrediction(matches) {
        const value = this.form.getRawValue();
        if (this.form.invalid || !matches.some(({ id }) => id === value.matchId) || this.isSaving) {
            this.form.markAllAsTouched();
            return;
        }
        this.isSaving = true;
        this.api.createPrediction({ matchId: value.matchId, playerName: value.playerName.trim(), score: [value.scoreA, value.scoreB] })
            .pipe(finalize(() => { this.isSaving = false; }), takeUntilDestroyed(this.destroyRef))
            .subscribe({
            next: () => { this.dataService.reload(); this.snackBar.open('Pronostic enregistré !', 'Fermer', { duration: 3000 }); },
            error: () => this.snackBar.open("Le pronostic n'a pas pu être enregistré.", 'Fermer', { duration: 4000 }),
        });
    }
    selectedMatch() { return this.matches.find(({ id }) => id === this.form.controls.matchId.value); }
    scoreErrorMessage() {
        const match = this.selectedMatch();
        if (!match)
            return '';
        const wins = this.winsRequired(match);
        if (this.form.hasError('scoreOutOfRange'))
            return `En ${match.format}, une équipe ne peut pas dépasser ${wins} victoire${wins > 1 ? 's' : ''}.`;
        if (this.form.hasError('invalidSeriesScore'))
            return `Score invalide : le vainqueur doit atteindre ${wins}, sans égalité.`;
        return '';
    }
    teamName(match, teamId) { return match.teams.find(({ id }) => id === teamId)?.name ?? teamId; }
    majorTeams(matches) {
        const teams = new Map();
        for (const match of matches) {
            if (!/(LCS|LEC|LCK|LPL|LTA|north america|europe|emea|korea|china)/i.test(`${match.league} ${match.tournament}`))
                continue;
            for (const team of match.teams)
                teams.set(team.id, team);
        }
        return [...teams.values()].sort((a, b) => a.name.localeCompare(b.name));
    }
    competitions(matches) {
        const values = new Map(matches.map((match) => [this.competitionValue(match), `${match.league} — ${match.tournament}`]));
        return [...values].map(([value, label]) => ({ value, label })).sort((a, b) => a.label.localeCompare(b.label));
    }
    filteredMatches(matches) {
        return matches.filter((match) => this.matchesCompetition(match, this.competitionControl.value));
    }
    upcomingPredictions(matches, predictions) {
        const playerName = this.form.controls.playerName.value.trim().toLocaleLowerCase();
        const matchesById = new Map(matches.filter(({ status }) => status === 'upcoming').map((match) => [match.id, match]));
        return predictions
            .filter((prediction) => prediction.playerName.trim().toLocaleLowerCase() === playerName)
            .flatMap((prediction) => {
            const match = matchesById.get(prediction.matchId);
            return match ? [{ match, prediction }] : [];
        })
            .sort((a, b) => a.match.startsAt.localeCompare(b.match.startsAt));
    }
    loadPrediction(matchId) {
        const match = this.matches.find(({ id }) => id === matchId);
        if (!match)
            return;
        const player = this.form.controls.playerName.value.trim().toLocaleLowerCase();
        const saved = this.predictions.find((item) => item.matchId === matchId && item.playerName.trim().toLocaleLowerCase() === player);
        const wins = this.winsRequired(match);
        this.form.patchValue({ scoreA: saved?.score[0] ?? wins, scoreB: saved?.score[1] ?? Math.max(0, wins - 1) }, { emitEvent: false });
        this.form.updateValueAndValidity({ emitEvent: false });
    }
    winsRequired(match) { return match.format === 'BO1' ? 1 : match.format === 'BO3' ? 2 : 3; }
    competitionValue(match) { return `${match.league}|||${match.tournament}`; }
    matchesCompetition(match, competition) { return competition === 'all' || this.competitionValue(match) === competition; }
    static { this.ɵfac = function AppComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AppComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AppComponent, selectors: [["app-root"]], decls: 2, vars: 3, consts: [[1, "shell"], [1, "topbar"], [1, "brand"], [1, "eyebrow"], [1, "toolbar-spacer"], ["appearance", "outlined", 1, "auth-card", "auth-connected"], ["appearance", "outlined", 1, "auth-card"], ["appearance", "outlined", 1, "status-card"], ["appearance", "outlined", 1, "api-warning"], [1, "grid"], ["mat-stroked-button", "", "type", "button", 3, "click"], [1, "auth-form", 3, "ngSubmit", "formGroup"], ["appearance", "outline"], ["matInput", "", "type", "email", "formControlName", "email", "autocomplete", "email"], ["matInput", "", "type", "password", "formControlName", "password", "autocomplete", "current-password"], ["mat-flat-button", "", "type", "submit", 3, "disabled"], ["mat-button", "", "type", "button", 3, "click"], ["matInput", "", "formControlName", "displayName", "autocomplete", "nickname"], ["aria-hidden", "true", 1, "loading-spinner"], ["aria-hidden", "true", 1, "warning-symbol"], ["appearance", "outlined", 1, "panel", "span-full", "filter-panel"], ["appearance", "outline", "subscriptSizing", "dynamic"], [3, "formControl"], ["value", "all"], [3, "value"], ["appearance", "outlined", 1, "panel", "span-2"], [1, "match-list"], ["type", "button", 1, "match-row"], ["appearance", "outlined", 1, "panel", "prediction-panel"], [3, "ngSubmit", "formGroup"], ["matInput", "", "type", "text", "formControlName", "playerName", "placeholder", "Ton pseudo", "readonly", ""], ["formControlName", "matchId"], ["value", ""], [1, "score-grid"], [1, "score-error"], ["mat-flat-button", "", "type", "submit", 1, "primary-action", 3, "disabled"], ["appearance", "outlined", 1, "panel", "prediction-recap-panel"], [1, "prediction-recap"], [1, "prediction-recap-row"], [1, "empty-state"], ["appearance", "outlined", 1, "panel", "leaderboard-panel"], [1, "leaderboard"], [1, "results"], ["appearance", "outlined"], ["type", "button", 1, "match-row", 3, "click"], [1, "league"], [1, "teams"], [1, "team-badge"], [3, "src", "alt"], [1, "versus"], ["aria-hidden", "true", 1, "row-arrow"], ["matInput", "", "type", "number", "min", "0", "formControlName", "scoreA", 3, "max"], ["matInput", "", "type", "number", "min", "0", "formControlName", "scoreB", 3, "max"], [1, "prediction-score"], ["matListItemIcon", "", 1, "rank"], ["matListItemTitle", ""], ["matListItemMeta", ""], ["appearance", "outlined", 1, "panel", "span-full"], [1, "team-gallery"], [1, "team-card"], [1, "team-logo-large"], ["loading", "lazy", 3, "src", "alt"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, AppComponent_Conditional_0_Template, 16, 6, "main", 0);
            i0.ɵɵpipe(1, "async");
        } if (rf & 2) {
            let tmp_0_0;
            i0.ɵɵconditional((tmp_0_0 = i0.ɵɵpipeBind1(1, 1, ctx.state$)) ? 0 : -1, tmp_0_0);
        } }, dependencies: [ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.MinValidator, i1.MaxValidator, i1.FormControlDirective, i1.FormGroupDirective, i1.FormControlName, MatButtonModule, i2.MatButton, MatCardModule, i3.MatCard, i3.MatCardContent, i3.MatCardHeader, i3.MatCardSubtitle, i3.MatCardTitle, i3.MatCardTitleGroup, MatChipsModule, i4.MatChip, MatFormFieldModule, i5.MatFormField, i5.MatLabel, i5.MatError, MatInputModule, i6.MatInput, MatListModule, i7.MatList, i7.MatListItem, i7.MatListItemIcon, i7.MatListItemTitle, i7.MatListItemMeta, MatSelectModule, i8.MatSelect, i8.MatOption, MatSnackBarModule, MatToolbarModule, i9.MatToolbar, AsyncPipe, DatePipe], styles: ["[_nghost-%COMP%] { display: block; font-family: Inter, ui-sans-serif, system-ui, sans-serif; min-height: 100vh; }\r\n.shell[_ngcontent-%COMP%] { margin: 0 auto; max-width: 1180px; padding: 28px 20px 48px; }\r\n.topbar[_ngcontent-%COMP%] { background: transparent; height: auto; margin-bottom: 24px; padding: 0; }\n.auth-card[_ngcontent-%COMP%] { margin-bottom: 16px; }\n.auth-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] { margin-bottom: 12px; }\n.auth-form[_ngcontent-%COMP%] { align-items: start; display: grid; gap: 8px; grid-template-columns: repeat(3, minmax(0, 1fr)) auto auto; }\n.auth-connected[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] { align-items: center; display: flex; justify-content: space-between; padding: 14px 16px; }\n.auth-connected[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { display: grid; }\n.auth-connected[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { color: var(--mat-sys-on-surface-variant); }\n.brand[_ngcontent-%COMP%] { display: grid; gap: 2px; }\r\n.toolbar-spacer[_ngcontent-%COMP%] { flex: 1; }\r\nh1[_ngcontent-%COMP%] { font-family: inherit; font-size: clamp(34px, 5vw, 58px); font-weight: 850; letter-spacing: -2px; line-height: .95; margin: 0; }\r\n.eyebrow[_ngcontent-%COMP%] { color: var(--mat-sys-secondary); font-size: 11px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }\r\n.api-warning[_ngcontent-%COMP%] { background: var(--mat-sys-error-container); margin-bottom: 16px; }\r\n.api-warning[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] { align-items: center; color: var(--mat-sys-on-error-container); display: flex; gap: 10px; padding: 14px 16px; }\n.api-warning[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] { margin-left: auto; }\n.warning-symbol[_ngcontent-%COMP%] { align-items: center; background: var(--mat-sys-error); border-radius: 50%; color: var(--mat-sys-on-error); display: inline-flex; flex: 0 0 22px; font-weight: 900; height: 22px; justify-content: center; }\n.status-card[_ngcontent-%COMP%] { margin-bottom: 16px; }\n.status-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] { align-items: center; display: flex; gap: 12px; padding: 18px; }\n.loading-spinner[_ngcontent-%COMP%] { animation: _ngcontent-%COMP%_spin .8s linear infinite; border: 3px solid var(--mat-sys-outline-variant); border-radius: 50%; border-top-color: var(--mat-sys-primary); height: 20px; width: 20px; }\n@keyframes _ngcontent-%COMP%_spin { to { transform: rotate(360deg); } }\n.grid[_ngcontent-%COMP%] { display: grid; gap: 16px; grid-template-columns: 1.35fr .95fr .85fr; }\r\n.panel[_ngcontent-%COMP%] { background: color-mix(in srgb, var(--mat-sys-surface-container-low) 94%, transparent); }\r\n.panel[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] { margin-bottom: 16px; }\r\n.panel[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] { font-family: inherit; font-size: 21px; font-weight: 800; line-height: 1.2; }\r\n.span-2[_ngcontent-%COMP%] { grid-column: span 2; }\r\n.span-full[_ngcontent-%COMP%] { grid-column: 1 / -1; }\r\n.filter-panel[_ngcontent-%COMP%] { align-items: center; display: flex; justify-content: flex-end; padding: 12px 16px; }\r\n.filter-panel[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] { max-width: 420px; width: 100%; }\r\n.match-list[_ngcontent-%COMP%] { display: grid; gap: 10px; max-height: 540px; overflow-y: auto; overscroll-behavior: contain; padding-right: 6px; scrollbar-gutter: stable; }\n.match-list[_ngcontent-%COMP%]::-webkit-scrollbar { width: 8px; }\n.match-list[_ngcontent-%COMP%]::-webkit-scrollbar-thumb { background: var(--mat-sys-outline-variant); border-radius: 999px; }\n.match-row[_ngcontent-%COMP%] { align-items: center; background: var(--mat-sys-surface-container-low); border: 1px solid var(--mat-sys-outline-variant); border-radius: 14px; color: inherit; cursor: pointer; display: grid; font: inherit; gap: 16px; grid-template-columns: minmax(150px, 1.1fr) minmax(150px, 1fr) minmax(120px, auto) 20px; min-height: 78px; overflow: hidden; padding: 10px 14px; text-align: left; width: 100%; }\r\n.match-row[_ngcontent-%COMP%]:hover { background: var(--mat-sys-secondary-container); border-color: var(--mat-sys-primary); }\r\n.match-row[_ngcontent-%COMP%]:focus-visible { outline: 3px solid color-mix(in srgb, var(--mat-sys-primary) 35%, transparent); outline-offset: 2px; }\r\n.league[_ngcontent-%COMP%] { display: grid; gap: 2px; }\r\n.league[_ngcontent-%COMP%], .league[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], .league[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], time[_ngcontent-%COMP%] { min-width: 0; }\r\n.league[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], time[_ngcontent-%COMP%] { color: var(--mat-sys-on-surface-variant); font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\r\n.teams[_ngcontent-%COMP%] { align-items: center; display: flex; gap: 10px; justify-content: center; }\r\n.team-badge[_ngcontent-%COMP%] { align-items: center; background: var(--team-color); border-radius: 10px; color: #fff; display: inline-flex; font-weight: 900; height: 42px; justify-content: center; min-width: 54px; padding: 0 10px; }\r\n.team-badge.has-logo[_ngcontent-%COMP%] { background: var(--mat-sys-surface); padding: 4px; }\r\n.team-badge[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] { height: 34px; object-fit: contain; width: 44px; }\r\n.versus[_ngcontent-%COMP%] { color: var(--mat-sys-on-surface-variant); font-size: 11px; font-weight: 800; }\r\n.row-arrow[_ngcontent-%COMP%] { color: var(--mat-sys-primary); font-size: 28px; font-weight: 400; line-height: 1; text-align: right; }\r\nform[_ngcontent-%COMP%] { display: grid; gap: 4px; }\r\nmat-form-field[_ngcontent-%COMP%] { width: 100%; }\r\n.score-grid[_ngcontent-%COMP%] { display: grid; gap: 0; grid-template-columns: 1fr; }\r\n.score-error[_ngcontent-%COMP%] { color: var(--mat-sys-error); font-size: 12px; line-height: 1.35; margin: -8px 12px 10px; }\r\n.primary-action[_ngcontent-%COMP%] { min-height: 48px; }\n.prediction-recap[_ngcontent-%COMP%] { display: grid; gap: 10px; max-height: 360px; overflow-y: auto; }\n.prediction-recap-row[_ngcontent-%COMP%] { align-items: center; background: var(--mat-sys-surface-container); border-radius: 14px; display: grid; gap: 8px; grid-template-columns: 1fr auto; padding: 12px 14px; }\n.prediction-recap-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] { display: grid; }\n.prediction-recap-row[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], .empty-state[_ngcontent-%COMP%] { color: var(--mat-sys-on-surface-variant); }\n.prediction-score[_ngcontent-%COMP%] { color: var(--mat-sys-primary); font-size: 18px; }\n.leaderboard[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%] { border-bottom: 1px solid var(--mat-sys-outline-variant); }\r\n.leaderboard[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]:last-child { border-bottom: 0; }\r\n.rank[_ngcontent-%COMP%] { align-items: center; background: var(--mat-sys-primary); border-radius: 10px; color: var(--mat-sys-on-primary); display: inline-flex; font-weight: 900; height: 32px; justify-content: center; width: 32px; }\r\n.results[_ngcontent-%COMP%] { display: grid; gap: 10px; grid-template-columns: repeat(2, minmax(0, 1fr)); }\r\n.results[_ngcontent-%COMP%]    > mat-card[_ngcontent-%COMP%] { background: var(--mat-sys-surface-container); padding: 14px; }\r\n.results[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] { color: var(--mat-sys-on-surface-variant); padding: 8px 0 0; }\r\n.team-gallery[_ngcontent-%COMP%] { display: grid; gap: 10px; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); }\r\n.team-card[_ngcontent-%COMP%] { align-items: center; background: var(--mat-sys-surface-container); border-radius: 14px; display: flex; gap: 12px; min-width: 0; padding: 10px; }\r\n.team-card[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]:last-child { display: grid; min-width: 0; }\r\n.team-card[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\r\n.team-card[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] { color: var(--mat-sys-on-surface-variant); }\r\n.team-logo-large[_ngcontent-%COMP%] { align-items: center; background: var(--mat-sys-surface); border-radius: 12px; display: inline-flex; flex: 0 0 52px; font-weight: 900; height: 52px; justify-content: center; }\r\n.team-logo-large[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] { height: 44px; object-fit: contain; width: 44px; }\r\n@media (max-width: 980px) { .grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; } .span-2[_ngcontent-%COMP%] { grid-column: span 1; } .auth-form[_ngcontent-%COMP%] { grid-template-columns: 1fr; } }\n@media (max-width: 680px) { .shell[_ngcontent-%COMP%] { padding: 20px 12px 36px; } .topbar[_ngcontent-%COMP%] { align-items: flex-start; gap: 14px; } .match-row[_ngcontent-%COMP%] { gap: 10px; grid-template-columns: 1fr 24px; } .teams[_ngcontent-%COMP%] { justify-content: flex-start; } .match-row[_ngcontent-%COMP%]   time[_ngcontent-%COMP%] { grid-column: 1; } .results[_ngcontent-%COMP%], .score-grid[_ngcontent-%COMP%] { grid-template-columns: 1fr; } }"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AppComponent, [{
        type: Component,
        args: [{ selector: 'app-root', standalone: true, imports: [AsyncPipe, DatePipe, ReactiveFormsModule, MatButtonModule, MatCardModule, MatChipsModule, MatFormFieldModule,
                    MatInputModule, MatListModule, MatSelectModule, MatSnackBarModule, MatToolbarModule], template: "@if (state$ | async; as state) {\n  <main class=\"shell\">\n    <mat-toolbar class=\"topbar\">\n      <div class=\"brand\">\n        <span class=\"eyebrow\">League of Legends</span>\n        <h1>MPP Esport</h1>\n      </div>\n      <span class=\"toolbar-spacer\"></span>\n      <mat-chip>V1 Summer Split</mat-chip>\n    </mat-toolbar>\n\n    @if (user$ | async; as user) {\n      <mat-card appearance=\"outlined\" class=\"auth-card auth-connected\">\n        <mat-card-content>\n          <span><strong>{{ user.displayName }}</strong><small>{{ user.email }}</small></span>\n          <button mat-stroked-button type=\"button\" (click)=\"logout()\">Se d\u00E9connecter</button>\n        </mat-card-content>\n      </mat-card>\n    } @else {\n      <mat-card appearance=\"outlined\" class=\"auth-card\">\n        <mat-card-header>\n          <mat-card-subtitle class=\"eyebrow\">Compte joueur</mat-card-subtitle>\n          <mat-card-title>{{ authMode === 'login' ? 'Connexion' : 'Cr\u00E9er un compte' }}</mat-card-title>\n        </mat-card-header>\n        <mat-card-content>\n          <form class=\"auth-form\" [formGroup]=\"authForm\" (ngSubmit)=\"submitAuth()\">\n            <mat-form-field appearance=\"outline\">\n              <mat-label>Email</mat-label>\n              <input matInput type=\"email\" formControlName=\"email\" autocomplete=\"email\">\n            </mat-form-field>\n            @if (authMode === 'register') {\n              <mat-form-field appearance=\"outline\">\n                <mat-label>Nom affich\u00E9</mat-label>\n                <input matInput formControlName=\"displayName\" autocomplete=\"nickname\">\n              </mat-form-field>\n            }\n            <mat-form-field appearance=\"outline\">\n              <mat-label>Mot de passe</mat-label>\n              <input matInput type=\"password\" formControlName=\"password\" autocomplete=\"current-password\">\n            </mat-form-field>\n            <button mat-flat-button type=\"submit\" [disabled]=\"isAuthenticating\">\n              {{ isAuthenticating ? 'Patiente\u2026' : authMode === 'login' ? 'Se connecter' : \"S'inscrire\" }}\n            </button>\n            <button mat-button type=\"button\" (click)=\"authMode = authMode === 'login' ? 'register' : 'login'\">\n              {{ authMode === 'login' ? 'Cr\u00E9er un compte' : \"J'ai d\u00E9j\u00E0 un compte\" }}\n            </button>\n          </form>\n        </mat-card-content>\n      </mat-card>\n    }\n\n    @if (state.status === 'loading') {\n      <mat-card appearance=\"outlined\" class=\"status-card\">\n        <mat-card-content>\n          <span class=\"loading-spinner\" aria-hidden=\"true\"></span>\n          <span>Chargement des donn\u00E9es esport\u2026</span>\n        </mat-card-content>\n      </mat-card>\n    }\n\n    @if (state.status === 'error') {\n      <mat-card appearance=\"outlined\" class=\"api-warning\">\n        <mat-card-content>\n          <span class=\"warning-symbol\" aria-hidden=\"true\">!</span>\n          <span>{{ state.message }}</span>\n          <button mat-stroked-button type=\"button\" (click)=\"retry()\">R\u00E9essayer</button>\n        </mat-card-content>\n      </mat-card>\n    }\n\n    @if (state.status === 'ready') {\n      <section class=\"grid\">\n        <mat-card appearance=\"outlined\" class=\"panel span-full filter-panel\">\n          <mat-form-field appearance=\"outline\" subscriptSizing=\"dynamic\">\n            <mat-label>Comp\u00E9tition</mat-label>\n            <mat-select [formControl]=\"competitionControl\">\n              <mat-option value=\"all\">Toutes les comp\u00E9titions</mat-option>\n              @for (competition of competitions(state.data.matches); track competition.value) {\n                <mat-option [value]=\"competition.value\">{{ competition.label }}</mat-option>\n              }\n            </mat-select>\n          </mat-form-field>\n        </mat-card>\n\n        <mat-card appearance=\"outlined\" class=\"panel span-2\">\n          <mat-card-header>\n            <mat-card-title-group>\n              <mat-card-subtitle class=\"eyebrow\">\u00C0 venir</mat-card-subtitle>\n              <mat-card-title>Matchs ouverts aux pronos</mat-card-title>\n              <mat-chip>{{ filteredMatches(state.data.upcomingMatches).length }} matchs</mat-chip>\n            </mat-card-title-group>\n          </mat-card-header>\n          <mat-card-content class=\"match-list\">\n            @for (match of filteredMatches(state.data.upcomingMatches); track match.id) {\n              <button class=\"match-row\" type=\"button\" (click)=\"selectMatch(match)\">\n                <span class=\"league\">\n                  <strong>{{ match.league }}</strong>\n                  <small>{{ match.tournament }} \u00B7 {{ match.format }}</small>\n                </span>\n                <span class=\"teams\">\n                  <span class=\"team-badge\" [class.has-logo]=\"match.teams[0].logoUrl\" [style.--team-color]=\"match.teams[0].logoColor\">\n                    @if (match.teams[0].logoUrl; as logoUrl) {\n                      <img [src]=\"logoUrl\" [alt]=\"match.teams[0].name\">\n                    } @else {\n                      {{ match.teams[0].code }}\n                    }\n                  </span>\n                  <span class=\"versus\">VS</span>\n                  <span class=\"team-badge\" [class.has-logo]=\"match.teams[1].logoUrl\" [style.--team-color]=\"match.teams[1].logoColor\">\n                    @if (match.teams[1].logoUrl; as logoUrl) {\n                      <img [src]=\"logoUrl\" [alt]=\"match.teams[1].name\">\n                    } @else {\n                      {{ match.teams[1].code }}\n                    }\n                  </span>\n                </span>\n                <time>{{ match.startsAt | date:'EEE d MMM, HH:mm' }}</time>\n                <span class=\"row-arrow\" aria-hidden=\"true\">\u203A</span>\n              </button>\n            }\n          </mat-card-content>\n        </mat-card>\n\n        <mat-card appearance=\"outlined\" class=\"panel prediction-panel\">\n          <mat-card-header>\n            <mat-card-subtitle class=\"eyebrow\">Prono</mat-card-subtitle>\n            <mat-card-title>Ton ticket</mat-card-title>\n          </mat-card-header>\n          <mat-card-content>\n            <form [formGroup]=\"form\" (ngSubmit)=\"submitPrediction(state.data.matches)\">\n              <mat-form-field appearance=\"outline\">\n                <mat-label>Pseudo</mat-label>\n                <input matInput type=\"text\" formControlName=\"playerName\" placeholder=\"Ton pseudo\" readonly>\n                <mat-error>Entre au moins 2 caract\u00E8res.</mat-error>\n              </mat-form-field>\n              <mat-form-field appearance=\"outline\">\n                <mat-label>Match</mat-label>\n                <mat-select formControlName=\"matchId\">\n                  <mat-option value=\"\">Choisir un match</mat-option>\n                  @for (match of filteredMatches(state.data.upcomingMatches); track match.id) {\n                    <mat-option [value]=\"match.id\">{{ match.teams[0].code }} vs {{ match.teams[1].code }}</mat-option>\n                  }\n                </mat-select>\n              </mat-form-field>\n\n              @if (selectedMatch(); as match) {\n                <div class=\"score-grid\">\n                  <mat-form-field appearance=\"outline\">\n                    <mat-label>{{ match.teams[0].name }}</mat-label>\n                    <input matInput type=\"number\" min=\"0\" [max]=\"match.format === 'BO1' ? 1 : match.format === 'BO3' ? 2 : 3\" formControlName=\"scoreA\">\n                  </mat-form-field>\n                  <mat-form-field appearance=\"outline\">\n                    <mat-label>{{ match.teams[1].name }}</mat-label>\n                    <input matInput type=\"number\" min=\"0\" [max]=\"match.format === 'BO1' ? 1 : match.format === 'BO3' ? 2 : 3\" formControlName=\"scoreB\">\n                  </mat-form-field>\n                </div>\n              }\n              @if (scoreErrorMessage() && (form.controls.scoreA.dirty || form.controls.scoreB.dirty || form.controls.scoreA.touched || form.controls.scoreB.touched)) {\n                <p class=\"score-error\">{{ scoreErrorMessage() }}</p>\n              }\n              <button mat-flat-button class=\"primary-action\" type=\"submit\" [disabled]=\"isSaving || !(user$ | async)\">\n                {{ isSaving ? 'Enregistrement\u2026' : 'Valider le prono' }}\n              </button>\n            </form>\n          </mat-card-content>\n        </mat-card>\n\n        <mat-card appearance=\"outlined\" class=\"panel prediction-recap-panel\">\n          <mat-card-header>\n            <mat-card-subtitle class=\"eyebrow\">Mes pronostics</mat-card-subtitle>\n            <mat-card-title>Matchs \u00E0 venir</mat-card-title>\n          </mat-card-header>\n          <mat-card-content class=\"prediction-recap\">\n            @for (item of upcomingPredictions(state.data.matches, state.data.predictions); track item.prediction.id) {\n              <article class=\"prediction-recap-row\">\n                <span>\n                  <strong>{{ item.match.teams[0].code }} vs {{ item.match.teams[1].code }}</strong>\n                  <small>{{ item.match.league }} \u00B7 {{ item.match.startsAt | date:'EEE d MMM, HH:mm' }}</small>\n                </span>\n                <strong class=\"prediction-score\">{{ item.prediction.score[0] }} \u2013 {{ item.prediction.score[1] }}</strong>\n              </article>\n            } @empty {\n              <p class=\"empty-state\">Aucun pronostic \u00E0 venir pour ce pseudo.</p>\n            }\n          </mat-card-content>\n        </mat-card>\n\n        <mat-card appearance=\"outlined\" class=\"panel leaderboard-panel\">\n          <mat-card-header>\n            <mat-card-subtitle class=\"eyebrow\">Ligue priv\u00E9e</mat-card-subtitle>\n            <mat-card-title>Classement</mat-card-title>\n          </mat-card-header>\n          <mat-card-content>\n            <mat-list class=\"leaderboard\">\n              @for (player of state.data.leaderboard; track player.playerName; let index = $index) {\n                <mat-list-item>\n                  <span matListItemIcon class=\"rank\">{{ index + 1 }}</span>\n                  <strong matListItemTitle>{{ player.playerName }}</strong>\n                  <span matListItemMeta>{{ player.points }} pts</span>\n                </mat-list-item>\n              }\n            </mat-list>\n          </mat-card-content>\n        </mat-card>\n\n        <mat-card appearance=\"outlined\" class=\"panel span-2\">\n          <mat-card-header>\n            <mat-card-subtitle class=\"eyebrow\">R\u00E9sultats</mat-card-subtitle>\n            <mat-card-title>Matchs termin\u00E9s</mat-card-title>\n          </mat-card-header>\n          <mat-card-content class=\"results\">\n            @for (match of filteredMatches(state.data.finishedMatches); track match.id) {\n              <mat-card appearance=\"outlined\">\n                <mat-card-subtitle>{{ match.league }}</mat-card-subtitle>\n                <mat-card-title>{{ match.teams[0].code }} {{ match.result?.score?.[0] }} \u2013 {{ match.result?.score?.[1] }} {{ match.teams[1].code }}</mat-card-title>\n                <mat-card-content>Vainqueur : {{ teamName(match, match.result?.winnerId ?? '') }}</mat-card-content>\n              </mat-card>\n            }\n          </mat-card-content>\n        </mat-card>\n\n        @if (majorTeams(state.data.matches); as teams) {\n          @if (teams.length) {\n            <mat-card appearance=\"outlined\" class=\"panel span-full\">\n              <mat-card-header>\n                <mat-card-subtitle class=\"eyebrow\">R\u00E9gions majeures</mat-card-subtitle>\n                <mat-card-title>\u00C9quipes LCS \u00B7 LEC \u00B7 LCK \u00B7 LPL</mat-card-title>\n              </mat-card-header>\n              <mat-card-content class=\"team-gallery\">\n                @for (team of teams; track team.id) {\n                  <article class=\"team-card\">\n                    <span class=\"team-logo-large\" [style.--team-color]=\"team.logoColor\">\n                      @if (team.logoUrl; as logoUrl) {\n                        <img [src]=\"logoUrl\" [alt]=\"team.name\" loading=\"lazy\">\n                      } @else {\n                        {{ team.code }}\n                      }\n                    </span>\n                    <span><strong>{{ team.name }}</strong><small>{{ team.code }}</small></span>\n                  </article>\n                }\n              </mat-card-content>\n            </mat-card>\n          }\n        }\n      </section>\n    }\n  </main>\n}\n", styles: [":host { display: block; font-family: Inter, ui-sans-serif, system-ui, sans-serif; min-height: 100vh; }\r\n.shell { margin: 0 auto; max-width: 1180px; padding: 28px 20px 48px; }\r\n.topbar { background: transparent; height: auto; margin-bottom: 24px; padding: 0; }\n.auth-card { margin-bottom: 16px; }\n.auth-card mat-card-header { margin-bottom: 12px; }\n.auth-form { align-items: start; display: grid; gap: 8px; grid-template-columns: repeat(3, minmax(0, 1fr)) auto auto; }\n.auth-connected mat-card-content { align-items: center; display: flex; justify-content: space-between; padding: 14px 16px; }\n.auth-connected span { display: grid; }\n.auth-connected small { color: var(--mat-sys-on-surface-variant); }\n.brand { display: grid; gap: 2px; }\r\n.toolbar-spacer { flex: 1; }\r\nh1 { font-family: inherit; font-size: clamp(34px, 5vw, 58px); font-weight: 850; letter-spacing: -2px; line-height: .95; margin: 0; }\r\n.eyebrow { color: var(--mat-sys-secondary); font-size: 11px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }\r\n.api-warning { background: var(--mat-sys-error-container); margin-bottom: 16px; }\r\n.api-warning mat-card-content { align-items: center; color: var(--mat-sys-on-error-container); display: flex; gap: 10px; padding: 14px 16px; }\n.api-warning button { margin-left: auto; }\n.warning-symbol { align-items: center; background: var(--mat-sys-error); border-radius: 50%; color: var(--mat-sys-on-error); display: inline-flex; flex: 0 0 22px; font-weight: 900; height: 22px; justify-content: center; }\n.status-card { margin-bottom: 16px; }\n.status-card mat-card-content { align-items: center; display: flex; gap: 12px; padding: 18px; }\n.loading-spinner { animation: spin .8s linear infinite; border: 3px solid var(--mat-sys-outline-variant); border-radius: 50%; border-top-color: var(--mat-sys-primary); height: 20px; width: 20px; }\n@keyframes spin { to { transform: rotate(360deg); } }\n.grid { display: grid; gap: 16px; grid-template-columns: 1.35fr .95fr .85fr; }\r\n.panel { background: color-mix(in srgb, var(--mat-sys-surface-container-low) 94%, transparent); }\r\n.panel mat-card-header { margin-bottom: 16px; }\r\n.panel mat-card-title { font-family: inherit; font-size: 21px; font-weight: 800; line-height: 1.2; }\r\n.span-2 { grid-column: span 2; }\r\n.span-full { grid-column: 1 / -1; }\r\n.filter-panel { align-items: center; display: flex; justify-content: flex-end; padding: 12px 16px; }\r\n.filter-panel mat-form-field { max-width: 420px; width: 100%; }\r\n.match-list { display: grid; gap: 10px; max-height: 540px; overflow-y: auto; overscroll-behavior: contain; padding-right: 6px; scrollbar-gutter: stable; }\n.match-list::-webkit-scrollbar { width: 8px; }\n.match-list::-webkit-scrollbar-thumb { background: var(--mat-sys-outline-variant); border-radius: 999px; }\n.match-row { align-items: center; background: var(--mat-sys-surface-container-low); border: 1px solid var(--mat-sys-outline-variant); border-radius: 14px; color: inherit; cursor: pointer; display: grid; font: inherit; gap: 16px; grid-template-columns: minmax(150px, 1.1fr) minmax(150px, 1fr) minmax(120px, auto) 20px; min-height: 78px; overflow: hidden; padding: 10px 14px; text-align: left; width: 100%; }\r\n.match-row:hover { background: var(--mat-sys-secondary-container); border-color: var(--mat-sys-primary); }\r\n.match-row:focus-visible { outline: 3px solid color-mix(in srgb, var(--mat-sys-primary) 35%, transparent); outline-offset: 2px; }\r\n.league { display: grid; gap: 2px; }\r\n.league, .league strong, .league small, time { min-width: 0; }\r\n.league small, time { color: var(--mat-sys-on-surface-variant); font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\r\n.teams { align-items: center; display: flex; gap: 10px; justify-content: center; }\r\n.team-badge { align-items: center; background: var(--team-color); border-radius: 10px; color: #fff; display: inline-flex; font-weight: 900; height: 42px; justify-content: center; min-width: 54px; padding: 0 10px; }\r\n.team-badge.has-logo { background: var(--mat-sys-surface); padding: 4px; }\r\n.team-badge img { height: 34px; object-fit: contain; width: 44px; }\r\n.versus { color: var(--mat-sys-on-surface-variant); font-size: 11px; font-weight: 800; }\r\n.row-arrow { color: var(--mat-sys-primary); font-size: 28px; font-weight: 400; line-height: 1; text-align: right; }\r\nform { display: grid; gap: 4px; }\r\nmat-form-field { width: 100%; }\r\n.score-grid { display: grid; gap: 0; grid-template-columns: 1fr; }\r\n.score-error { color: var(--mat-sys-error); font-size: 12px; line-height: 1.35; margin: -8px 12px 10px; }\r\n.primary-action { min-height: 48px; }\n.prediction-recap { display: grid; gap: 10px; max-height: 360px; overflow-y: auto; }\n.prediction-recap-row { align-items: center; background: var(--mat-sys-surface-container); border-radius: 14px; display: grid; gap: 8px; grid-template-columns: 1fr auto; padding: 12px 14px; }\n.prediction-recap-row span { display: grid; }\n.prediction-recap-row small, .empty-state { color: var(--mat-sys-on-surface-variant); }\n.prediction-score { color: var(--mat-sys-primary); font-size: 18px; }\n.leaderboard mat-list-item { border-bottom: 1px solid var(--mat-sys-outline-variant); }\r\n.leaderboard mat-list-item:last-child { border-bottom: 0; }\r\n.rank { align-items: center; background: var(--mat-sys-primary); border-radius: 10px; color: var(--mat-sys-on-primary); display: inline-flex; font-weight: 900; height: 32px; justify-content: center; width: 32px; }\r\n.results { display: grid; gap: 10px; grid-template-columns: repeat(2, minmax(0, 1fr)); }\r\n.results > mat-card { background: var(--mat-sys-surface-container); padding: 14px; }\r\n.results mat-card-content { color: var(--mat-sys-on-surface-variant); padding: 8px 0 0; }\r\n.team-gallery { display: grid; gap: 10px; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); }\r\n.team-card { align-items: center; background: var(--mat-sys-surface-container); border-radius: 14px; display: flex; gap: 12px; min-width: 0; padding: 10px; }\r\n.team-card > span:last-child { display: grid; min-width: 0; }\r\n.team-card strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\r\n.team-card small { color: var(--mat-sys-on-surface-variant); }\r\n.team-logo-large { align-items: center; background: var(--mat-sys-surface); border-radius: 12px; display: inline-flex; flex: 0 0 52px; font-weight: 900; height: 52px; justify-content: center; }\r\n.team-logo-large img { height: 44px; object-fit: contain; width: 44px; }\r\n@media (max-width: 980px) { .grid { grid-template-columns: 1fr; } .span-2 { grid-column: span 1; } .auth-form { grid-template-columns: 1fr; } }\n@media (max-width: 680px) { .shell { padding: 20px 12px 36px; } .topbar { align-items: flex-start; gap: 14px; } .match-row { gap: 10px; grid-template-columns: 1fr 24px; } .teams { justify-content: flex-start; } .match-row time { grid-column: 1; } .results, .score-grid { grid-template-columns: 1fr; } }\r\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "app/app.component.ts", lineNumber: 27 }); })();
//# sourceMappingURL=app.component.js.map